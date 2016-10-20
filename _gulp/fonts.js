const gulp = require('gulp');
const newer = require('gulp-newer');
const rename = require('gulp-rename');
const using = require('gulp-using');
const watch = require('gulp-watch');

const config = require('../config.json');


// FONTS - Necessary fonts are simply copied to Assets folder
gulp.task('fonts', function () {

	const SRC = `${config.src}/${config.fonts.src}`;
	const DEST = `${config.dest}/${config.fonts.dest}/`;

	console.log(`copyFonts : ${SRC} --> ${DEST}`);

	return watch( SRC, { ignoreInitial: false })
		.pipe( newer( DEST ))
		.pipe( using( {prefix:'[fonts] using :', color:'blue', filesize:true} ))                    // list input stylesheet
		.pipe( rename( {dirname: ''} ))                               // removes path to put all files in same folder (prevent directory tree duplication)
		.pipe( gulp.dest( DEST ));
});

