// npm packages
const cleanCss = require('gulp-clean-css');
const concat = require('gulp-concat');
const gulp = require('gulp');
const newer = require('gulp-newer');
const using = require('gulp-using');

// imports
const config = require('./_config.json');

// globs
const SRC = `${config.temp}/${config.style.srcFinalCss}`;
const DEST = `${config.dest}/${config.style.destFinalCss}/`;
const STYLESHEET = config.style.finalCssSheet;

// task
gulp.task('styleFinal', () => {
	console.log(`Building stylesheet from : ${SRC} --> ${DEST}${STYLESHEET}`);

	return gulp.src( SRC , { ignoreInitial: false })
		.pipe( newer( DEST + STYLESHEET ))
		.pipe( using( {prefix:'[style/final] concatenating :', color:'yellow', filesize:true} ))
		.pipe( concat ( STYLESHEET ))
		.pipe( cleanCss())
		.pipe( using( {prefix:'[style/final] done & cleaned :', color:'yellow', filesize:true} ))
		.pipe( gulp.dest( DEST ));
});