// npm packages
const _if = require('gulp-if');								// https://www.npmjs.com/package/gulp-if
const autoprefixer = require('gulp-autoprefixer');			// https://www.npmjs.com/package/gulp-autoprefixer
const cleanCss = require('gulp-clean-css');					// https://www.npmjs.com/package/gulp-clean-css
const concat = require('gulp-concat');						// https://www.npmjs.com/package/gulp-concat
const gcmq = require('gulp-group-css-media-queries');		// https://www.npmjs.com/package/gulp-group-css-media-queries
const gulp = require('gulp');								// http://gulpjs.com/
const newer = require('gulp-newer');						// https://www.npmjs.com/package/gulp-newer
const sourcemaps = require('gulp-sourcemaps');				// https://www.npmjs.com/package/gulp-sourcemaps
const using = require('gulp-using');						// https://www.npmjs.com/package/gulp-using

// imports
const co = require('./_config.json');

// task
gulp.task('styleFinal', () => {

	// globs
	const SRC = `${co.temp}/${co.style.srcFinalCss}`;
	const DEST = `${co.dest}/${co.style.destFinalCss}/`;
	const STYLESHEET = co.style.finalCssSheet;
	console.log(`Building stylesheet from : ${SRC} --> ${DEST}${STYLESHEET}`);

	const isTest = co.env.isTest;
	const isProd = co.env.isProd;

	return gulp.src( SRC , { ignoreInitial: false })
		.pipe(				newer( DEST + STYLESHEET ))
		.pipe( _if( isProd, sourcemaps.init() ))
		.pipe( _if( isTest, using( {prefix:'[style/final] concatenating :', color:'yellow', filesize:true} )))
		.pipe(				concat ( STYLESHEET ))
		.pipe( _if( isProd, gcmq() ))
		.pipe(				autoprefixer())
		.pipe( _if( isProd, cleanCss()))
		.pipe( _if( isProd, sourcemaps.write('./') ))
		.pipe( _if( isTest, using( {prefix:'[style/final] done & optimized :', color:'yellow', filesize:true} )))
		.pipe(				gulp.dest( DEST ));
});