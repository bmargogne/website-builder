// npm packages
const _if = require('gulp-if');									// https://www.npmjs.com/package/gulp-if
const concat = require('gulp-concat');							// https://www.npmjs.com/package/gulp-concat
const gulp = require('gulp');									// http://gulpjs.com/
const newer = require('gulp-newer');							// https://www.npmjs.com/package/gulp-newer
const sass = require('gulp-sass');								// https://www.npmjs.com/package/gulp-sass
const using = require('gulp-using');							// https://www.npmjs.com/package/gulp-using

// imports
const co = require('./_config.json');

// task
gulp.task('styleScss', () => {

	// globs
	const SRC = `${co.src}/${co.style.srcScss}`;
	const EXCLUDE1 = `!${co.src}/${co.exclude}/`;
	const EXCLUDE2 = `!${co.src}/${co.vendors.src}/`;
	const DEST = `${co.temp}/${co.style.destScss}/`;
	const STYLESHEET = co.style.scssSheet;
	console.log(`Styles SCSS Building : [${SRC}] --> [${DEST}${STYLESHEET}], excluding [${EXCLUDE1}] and [${EXCLUDE2}]`);

	const isTest = co.env.isTest;
	const scssDefault = co.style.scssDefaultRoot;

	return gulp.src( [SRC, EXCLUDE1, EXCLUDE2], { ignoreInitial: false })
		.pipe(				newer( DEST + STYLESHEET ))
		.pipe( _if( isTest,	using( {prefix:'[style/scss] preprocessing :', color:'yellow', filesize:true} )))
		.pipe(				sass({
								includePaths: `${co.src}/${scssDefault}`
							}).on('error', sass.logError))
		.pipe(				concat( STYLESHEET ))
		.pipe( _if( isTest,	using( {prefix:'[style/scss] done generating & concatenating:', color:'yellow', filesize:true} )))
		.pipe(				gulp.dest( DEST ));
});
