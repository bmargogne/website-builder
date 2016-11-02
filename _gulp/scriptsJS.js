// npm packages
const _if = require('gulp-if');								// https://www.npmjs.com/package/gulp-if
const concat = require('gulp-concat');						// https://www.npmjs.com/package/gulp-concat
const gulp = require('gulp');								// http://gulpjs.com/
const insert = require('gulp-insert');						// https://www.npmjs.com/package/gulp-concat
const newer = require('gulp-newer');						// https://www.npmjs.com/package/gulp-newer
const plumber = require('gulp-plumber');					// https://www.npmjs.com/package/gulp-plumber
const using = require('gulp-using');						// https://www.npmjs.com/package/gulp-using

// imports
const co = require('./_config.json');
const processScripts = co.buildingSteps.processScripts;

// task : JS files are wrapped in a 'document ready' jquery, hence use it for client side only
gulp.task('scriptsJS', () => {
	if (processScripts) {

		// globs
		const SRC = `${co.src}/${co.scripts.srcJs}`;
		const EXCLUDE1 = `!${co.src}/${co.exclude}/`;
		const EXCLUDE2 = `!${co.src}/${co.vendors.src}/`;
		const DEST = `${co.temp}/${co.scripts.tempDirectory}/`;
		const TEMPJSFILE = co.scripts.tempJsScript;
		console.log(`Scripts building : [${SRC}] --> [${DEST}${TEMPJSFILE}], excluding [${EXCLUDE1}] and [${EXCLUDE2}]`);

		// imports
		const isTest = co.env.isTest;
		const plumbing = co.buildingSteps.plumbing; 
		const before = co.scripts.wrapper.before;
		const after  = co.scripts.wrapper.after;

		return gulp.src( [SRC, EXCLUDE1, EXCLUDE2], { ignoreInitial: false })
			.pipe(					newer( DEST + TEMPJSFILE ))
			.pipe( _if( isTest, 	using({ prefix:'[scripts/JS] using :', color:'green', filesize:true })))
			.pipe( _if( plumbing,	plumber() ))
			
			.pipe(					concat ( TEMPJSFILE ))
			.pipe(					insert.wrap( before, after ))
			
			.pipe( _if( plumbing,	plumber.stop() ))
			.pipe(					gulp.dest( DEST ))
			.pipe( _if( isTest,		using({ prefix:'[scripts/JS] done :', color:'green', filesize:true })));
	}
	return;
});

