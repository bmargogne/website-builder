const cleanCss = require('gulp-clean-css');
const concat = require('gulp-continuous-concat');
const gulp = require('gulp');
const newer = require('gulp-newer');
const using = require('gulp-using');
const watch = require('gulp-watch');

const config = require('./config.json');

gulp.task('stylesFinal', () => {

	const SRC = `${config.temp}/${config.styles.srcFinalCss}`;
	const DEST = `${config.dest}/${config.styles.destFinalCss}/`;
	const STYLESHEET = config.styles.finalCssSheet;

	console.log(`Building final stylesheet : ${SRC} --> ${DEST}${STYLESHEET}`);

	return watch( SRC , { ignoreInitial: false })
		.pipe( newer( DEST + STYLESHEET ))
		.pipe( using( {prefix:'[styles/final] using :', color:'yellow', filesize:true} ) )                    // list input stylesheet
		.pipe( concat ( STYLESHEET ) )
		.pipe( cleanCss () )                                                                  // create a single files
		.pipe( using( {prefix:'[styles/final] done :', color:'yellow', filesize:true} ) )                    // list the concatenated file
		.pipe( gulp.dest( DEST ) );
});