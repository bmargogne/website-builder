// npm packages
const concat = require('gulp-concat');
const gulp = require('gulp');
const newer = require('gulp-newer');
const using = require('gulp-using');

// imports
const config = require('./_config.json');

// globs
const SRC = `${config.src}/${config.style.srcCss}`;
const EXCLUDE = `!${config.src}/${config.vendors.src}/`;
const DEST = `${config.temp}/${config.style.destCss}/`;
const STYLESHEET = config.style.cssSheet;

// task
gulp.task('styleCss', () => {
	console.log(`Style CSS building : ${SRC} --> ${DEST}${STYLESHEET}, excluding ${EXCLUDE}`);

	return gulp.src( [SRC, EXCLUDE], { ignoreInitial: false })
		.pipe( newer( DEST + STYLESHEET ))
		.pipe( using( {prefix:'[style/css] concatenating :', color:'yellow', filesize:true} ))
		.pipe( concat( STYLESHEET ))
		.pipe( using( {prefix:'[style/css] done concatenating :', color:'yellow', filesize:true} ))
		.pipe( gulp.dest( DEST ));
});
