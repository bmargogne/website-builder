// npm packages
const _if = require('gulp-if');							// https://www.npmjs.com/package/gulp-if
const concat = require('gulp-concat');					// https://www.npmjs.com/package/gulp-concat
const gulp = require('gulp');							// http://gulpjs.com/
const newer = require('gulp-newer');					// https://www.npmjs.com/package/gulp-newer
const using = require('gulp-using');					// https://www.npmjs.com/package/gulp-using

// imports
const co = require('./_config.json');

// task
gulp.task('styleCss', () => {

	// globs
	const SRC = `${co.src}/${co.style.srcCss}`;
	const EXCLUDE1 = `!${co.src}/${co.exclude}/`;
	const EXCLUDE2 = `!${co.src}/${co.vendors.src}/`;
	const DEST = `${co.temp}/${co.style.destCss}/`;
	const STYLESHEET = co.style.cssSheet;
	console.log(`Style CSS building : [${SRC}] --> [${DEST}${STYLESHEET}], excluding [${EXCLUDE1}], and [${EXCLUDE2}]`);

	const isTest = co.env.isTest;

	return gulp.src( [SRC, EXCLUDE1, EXCLUDE2], { ignoreInitial: false })
		.pipe(				newer( DEST + STYLESHEET ))
		.pipe( _if( isTest,	using( {prefix:'[style/css] using :', color:'yellow', filesize:true} )))
		.pipe(				concat( STYLESHEET ))
		.pipe(				gulp.dest( DEST ))
		.pipe( _if( isTest,	using( {prefix:'[style/css] done :', color:'yellow', filesize:true} )));
});
