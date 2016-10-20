const concat = require('gulp-continuous-concat');
const gulp = require('gulp');
const newer = require('gulp-newer');
const sass = require('gulp-sass');
const using = require('gulp-using');
const watch = require('gulp-watch');

const config = require('../config.json');

gulp.task('stylesScss', () => {

	const SRC = `${config.src}/${config.styles.srcScss}`;
	const DEST = `${config.temp}/${config.styles.destScss}/`;
	const STYLESHEET = config.styles.scssSheet;

	console.log(`styles : ${SRC} --> ${DEST}${STYLESHEET}`);

	return watch( SRC , { ignoreInitial: false })
		.pipe( newer( DEST + STYLESHEET ))
		.pipe( using( {prefix:'[styles/scss] using :', color:'yellow', filesize:true} ) )                    // list input stylesheet
		.pipe( sass().on('error', sass.logError))
		.pipe( concat ( STYLESHEET ) )                                                                  // create a single files
		.pipe( using( {prefix:'[styles/scss] done :', color:'yellow', filesize:true} ) )                    // list the concatenated file
		.pipe( gulp.dest( DEST ) );
});
