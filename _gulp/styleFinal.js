// npm packages
const _if = require('gulp-if');
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

	const isTest = config.env.isTest;
	const isProd = config.env.isProd;

	return gulp.src( SRC , { ignoreInitial: false })
		.pipe(				newer( DEST + STYLESHEET ))
		.pipe( _if( isProd, sourcemaps.init() ))
		.pipe( _if( isTest, using( {prefix:'[style/final] concatenating :', color:'yellow', filesize:true} )))
		.pipe(				concat ( STYLESHEET ))
		.pipe( _if( isProd, cleanCss()))
		.pipe( _if( isProd, sourcemaps.write('./') ))
		.pipe( _if( isTest, using( {prefix:'[style/final] done & optimized :', color:'yellow', filesize:true} )))
		.pipe(				gulp.dest( DEST ));
});