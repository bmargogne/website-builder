// npm packages
const _if = require('gulp-if');
const concat = require('gulp-concat');
const gulp = require('gulp');
const newer = require('gulp-newer');
const sass = require('gulp-sass');
const using = require('gulp-using');

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
	const isProd = co.env.isProd;

	return gulp.src( [SRC, EXCLUDE1, EXCLUDE2], { ignoreInitial: false })
		.pipe(				newer( DEST + STYLESHEET ))
		.pipe( _if( isTest,	using( {prefix:'[style/scss] preprocessing :', color:'yellow', filesize:true} )))
		.pipe(				sass().on('error', sass.logError))
		.pipe(				concat( STYLESHEET ))
		.pipe( _if( isTest,	using( {prefix:'[style/scss] done generating & concatenating:', color:'yellow', filesize:true} )))
		.pipe(				gulp.dest( DEST ));
});
