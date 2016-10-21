// npm packages
const _if = require('gulp-if');
const concat = require('gulp-concat');
const gulp = require('gulp');
const newer = require('gulp-newer');
const using = require('gulp-using');

// imports
const config = require('./_config.json');

// task
gulp.task('styleCss', () => {

	// globs
	const SRC = `${config.src}/${config.style.srcCss}`;
	const EXCLUDE = `!${config.src}/${config.vendors.src}/`;
	const DEST = `${config.temp}/${config.style.destCss}/`;
	const STYLESHEET = config.style.cssSheet;
	console.log(`Style CSS building : ${SRC} --> ${DEST}${STYLESHEET}, excluding ${EXCLUDE}`);

	const isTest = config.env.isTest;

	return gulp.src( [SRC, EXCLUDE], { ignoreInitial: false })
		.pipe(				newer( DEST + STYLESHEET ))
		.pipe( _if( isTest,	using( {prefix:'[style/css] concatenating :', color:'yellow', filesize:true} )))
		.pipe(				concat( STYLESHEET ))
		.pipe( _if( isTest,	using( {prefix:'[style/css] done concatenating :', color:'yellow', filesize:true} )))
		.pipe(				gulp.dest( DEST ));
});
