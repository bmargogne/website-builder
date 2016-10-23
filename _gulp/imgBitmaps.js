// npm packages
const _if = require('gulp-if');							// https://www.npmjs.com/package/gulp-if
const gulp = require('gulp');							// http://gulpjs.com/
const imagemin = require('gulp-imagemin');				// https://www.npmjs.com/package/gulp-imagemin
const newer = require('gulp-newer');					// https://www.npmjs.com/package/gulp-newer
const rename = require('gulp-rename');					// https://www.npmjs.com/package/gulp-rename
const runSequence = require('run-sequence');			// https://www.npmjs.com/package/run-sequence
const using = require('gulp-using');					// https://www.npmjs.com/package/gulp-using
const watch = require('gulp-watch');					// https://www.npmjs.com/package/gulp-watch

// imports
const co = require('./_config.json');
const processBitmaps = co.buildingSteps.processBitmaps;

// task
gulp.task('imgBitmaps', () => {
	if (processBitmaps) {

		// globs
		const SRC = `${co.src}/${co.images.srcBitmaps}`;
		const EXCLUDE1 = `!${co.src}/${co.exclude}/`;
		const EXCLUDE2 = `!${co.src}/${co.vendors.src}/`;
		const EXCLUDE3 = `!${co.src}/${co.images.srcSprite}/`;
		const DEST = `${co.dest}/${co.images.destBitmaps}/`;
		console.log(`Images Bitmaps : [${SRC}] --> [${DEST}], excluding [${EXCLUDE1}], [${EXCLUDE2}] and [${EXCLUDE3}]`);

		const isTest = co.env.isTest;
		const isProd = co.env.isProd;

		return gulp.src( [SRC, EXCLUDE1, EXCLUDE2, EXCLUDE3], { ignoreInitial: false })
			.pipe(				rename( {dirname: ''}))
			.pipe(				newer( DEST ))
			.pipe( _if(isTest,	using( {prefix:'[images/bitmaps] compressing :', color:'magenta', filesize:true} )))
			.pipe( _if(isProd,	imagemin()))
			.pipe(				gulp.dest(DEST));
	}
	return;
});

// watch
gulp.task('watch-imgBitmaps', () => {
	if (processBitmaps) {

		// globs
		const SRC = `${co.src}/${co.images.srcBitmaps}`;
		const EXCLUDE1 = `!${co.src}/${co.exclude}/`;
		const EXCLUDE2 = `!${co.src}/${co.vendors.src}/`;
		const EXCLUDE3 = `!${co.src}/${co.images.srcSprite}/`;
		console.log(`Watching bitmap images : [${SRC}], except for [${EXCLUDE1}], [${EXCLUDE2}] and [${EXCLUDE3}]`);

		return watch( [SRC, EXCLUDE1, EXCLUDE2, EXCLUDE3], () => {
			runSequence('imgBitmaps', 'liveReload');
		});
	}
	return;
});
