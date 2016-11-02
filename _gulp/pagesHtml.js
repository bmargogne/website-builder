// npm packages
const _if = require('gulp-if');							// https://www.npmjs.com/package/gulp-if
const gulp = require('gulp');							// http://gulpjs.com/
const fileinclude = require('gulp-file-include');		// https://www.npmjs.com/package/gulp-file-include
const htmlmin = require('gulp-htmlmin');				// https://www.npmjs.com/package/gulp-htmlmin
const newer = require('gulp-newer');					// https://www.npmjs.com/package/gulp-newer
const plumber = require('gulp-plumber');				// https://www.npmjs.com/package/gulp-plumber
const runSequence = require('run-sequence');			// https://www.npmjs.com/package/run-sequence
const using = require('gulp-using');					// https://www.npmjs.com/package/gulp-using
const watch = require('gulp-watch');					// https://www.npmjs.com/package/gulp-watch


const browserSync = require('browser-sync').create();	// https://www.browsersync.io/

// imports
const co = require('./_config.json');
const processPages = co.buildingSteps.processPages;

// task
gulp.task('pagesHtml', () => {
	if (processPages) {

		// globs
		const SRC = `${co.src}/${co.pages.src}`;
		const EXCLUDE1 = `!${co.src}/${co.exclude}`;
		const EXCLUDE2 = `!${co.src}/${co.vendors.src}`;
		const EXCLUDE3 = `!${co.src}/${co.pages.partials}`;
		const DEST = `${co.dest}/`;
		console.log(`Html Pages building : [${SRC}] --> [${DEST}], excluding [${EXCLUDE1}], [${EXCLUDE2}] and [${EXCLUDE3}] `);

		const isTest = co.env.isTest;
		const isProd = co.env.isTest;
		const plumbing = co.buildingSteps.plumbing;
		const forceRebuild = true; 	// if true, every change on HTML will rebuild everything.
									// disable for higher performance, and/or when partials are not modified often.

		return gulp.src( [SRC, EXCLUDE1, EXCLUDE2, EXCLUDE3], { ignoreInitial: false } )
			.pipe( _if(!forceRebuild,	newer( DEST )))
			.pipe( _if(plumbing,		plumber() ))
			.pipe(						fileinclude({ prefix: '@@', basepath: co.src }))
			.pipe( _if(isProd,			htmlmin({collapseWhitespace: true})))
			.pipe( _if(plumbing,		plumber.stop() ))
			.pipe(						gulp.dest( DEST ))
			.pipe( _if(isTest,			using( {prefix:'[pages/html] builded :', color:'cyan', filesize:true} )));
	}
	return;
});

// watch
gulp.task('watch-pagesHtml', () => {
	if (processPages) {

		// globs
		const SRC = `${co.src}/${co.pages.src}`;
		const EXCLUDE1 = `${co.src}/${co.exclude}`;
		const EXCLUDE2 = `!${co.src}/${co.vendors.src}`;
		console.log(`Watching Html Pages : [${SRC}], except for [${EXCLUDE1}] and [${EXCLUDE2}]`);

		return watch( [SRC, EXCLUDE1, EXCLUDE2], () => {
			runSequence('pagesHtml', 'liveReload');
		});
	}
	return;
});
