// npm packages
const cleanCss = require('gulp-clean-css');
const concat = require('gulp-concat');
const gulp = require('gulp');
const newer = require('gulp-newer');
const sourcemaps = require('gulp-sourcemaps');
const using = require('gulp-using');

// imports
const config = require('./_config.json');

// task
gulp.task('styleFinal', () => {

	// globs
	const SRC = `${config.temp}/${config.style.srcFinalCss}`;
	const DEST = `${config.dest}/${config.style.destFinalCss}/`;
	const STYLESHEET = config.style.finalCssSheet;

	console.log(`Building stylesheet from : ${SRC} --> ${DEST}${STYLESHEET}`);

	return gulp.src( SRC , { ignoreInitial: false })
		.pipe( newer( DEST + STYLESHEET ))
		.pipe( sourcemaps.init() )
			.pipe( using( {prefix:'[style/final] concatenating :', color:'yellow', filesize:true} ))
			.pipe( concat ( STYLESHEET ))
			.pipe( cleanCss())
		.pipe( sourcemaps.write('./') )
		.pipe( using( {prefix:'[style/final] done & optimized :', color:'yellow', filesize:true} ))
		.pipe( gulp.dest( DEST ));
});