const gulp = require('gulp');
const newer = require('gulp-newer');
const rename = require('gulp-rename');
const using = require('gulp-using');
const watch = require('gulp-watch');

const config = require('./config.json');

// all fonts files are simply copied to the destination folder (default "_assets/fonts").
gulp.task('fonts', function () {

	const SRC = `${config.src}/${config.fonts.src}`;
	const DEST = `${config.dest}/${config.fonts.dest}/`;

	console.log(`copyFonts : ${SRC} --> ${DEST}`);

	return watch( SRC, { ignoreInitial: false })
		.pipe( rename( {dirname: ''} ))                               // removes path to put all files in same folder (prevent directory tree duplication)
		.pipe( newer( DEST ))
		.pipe( using( {prefix:'[fonts] using :', color:'gray', filesize:true} ))                    // list input stylesheet
		.pipe( gulp.dest( DEST ));
});

