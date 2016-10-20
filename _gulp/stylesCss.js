const concat = require('gulp-continuous-concat');
const gulp = require('gulp');
const newer = require('gulp-newer');
const using = require('gulp-using');
const watch = require('gulp-watch');

const config = require('../config.json');

gulp.task('stylesCss', () => {

	const SRC = `${config.src}/${config.styles.srcCss}`;
	const DEST = `${config.temp}/${config.styles.destCss}/`;
	const STYLESHEET = config.styles.cssSheet;

	console.log(`styles : ${SRC} --> ${DEST}${STYLESHEET}`);

	return watch( SRC , { ignoreInitial: false })
		.pipe( newer( DEST + STYLESHEET ))
		.pipe( using( {prefix:'[styles/css] using :', color:'yellow', filesize:true} ) )                    // list input stylesheet
		.pipe( concat ( STYLESHEET ) )                                                                  // create a single files
		.pipe( using( {prefix:'[styles/css] done :', color:'yellow', filesize:true} ) )                    // list the concatenated file
		.pipe( gulp.dest( DEST ) );
});
