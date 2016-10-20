const concat = require('gulp-continuous-concat');
const gulp = require('gulp');
const newer = require('gulp-newer');
const using = require('gulp-using');
const watch = require('gulp-watch');

const config = require('../config.json');

gulp.task('scripts', () => {

	const SRC = `${config.src}/${config.scripts.src}`;
	const DEST = `${config.dest}/${config.scripts.dest}/`;
	const EXCLUDE = `!${config.src}/${config.vendors.src}/`;
	const SCRIPTFILE = config.scripts.scriptfile;

	console.log(`scripts : ${SRC} --> ${DEST}${SCRIPTFILE}`);

	return watch( [SRC, EXCLUDE] , { ignoreInitial: false })
		.pipe( newer( DEST + SCRIPTFILE ))
		.pipe( using( {prefix:'[scripts] using :', color:'green', filesize:true} ))     // list input stylesheet
		.pipe( concat ( SCRIPTFILE ) )                                                  // create a single files
		.pipe( using( {prefix:'[scripts] done :', color:'green', filesize:true} ))      // list the concatenated file
		.pipe( gulp.dest( DEST ) );
});
