// npm packages
const concat = require('gulp-concat');
const gulp = require('gulp');
const newer = require('gulp-newer');
const sass = require('gulp-sass');
const using = require('gulp-using');

// imports
const config = require('./_config.json');

// task
gulp.task('styleScss', () => {

	// globs
	const SRC = `${config.src}/${config.style.srcScss}`;
	const EXCLUDE = `!${config.src}/${config.vendors.src}/`;
	const DEST = `${config.temp}/${config.style.destScss}/`;
	const STYLESHEET = config.style.scssSheet;

	console.log(`Styles SCSS Building : ${SRC} --> ${DEST}${STYLESHEET}, excluding ${EXCLUDE}`);

	return gulp.src( [SRC, EXCLUDE], { ignoreInitial: false })
		.pipe( newer( DEST + STYLESHEET ))
		.pipe( using( {prefix:'[style/scss] preprocessing :', color:'yellow', filesize:true} ))
		.pipe( sass().on('error', sass.logError))
		.pipe( concat( STYLESHEET ))
		.pipe( using( {prefix:'[style/scss] done generating & concatenating:', color:'yellow', filesize:true} ))
		.pipe( gulp.dest( DEST ));
});
