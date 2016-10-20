const concat = require('gulp-continuous-concat');
const gulp = require('gulp');
const newer = require('gulp-newer');
const sass = require('gulp-sass');
const using = require('gulp-using');
const watch = require('gulp-watch');

const config = require('./_config.json');

gulp.task('stylesScss', () => {

	const SRC = `${config.src}/${config.styles.srcScss}`;
	const EXCLUDE = `!${config.src}/${config.vendors.src}/`;
	const DEST = `${config.temp}/${config.styles.destScss}/`;
	const STYLESHEET = config.styles.scssSheet;

	console.log(`Styles SCSS Building : ${SRC} --> ${DEST}${STYLESHEET}`);
	console.log(`Styles SCSS excludes : ${EXCLUDE}`);

	return watch( [SRC, EXCLUDE], { ignoreInitial: false })
		.pipe( newer( DEST + STYLESHEET ))
		.pipe( using( {prefix:'[styles/scss] using :', color:'yellow', filesize:true} ))
		.pipe( sass().on('error', sass.logError))
		.pipe( concat( STYLESHEET ))
		.pipe( using( {prefix:'[styles/scss] done :', color:'yellow', filesize:true} ))
		.pipe( gulp.dest( DEST ));
});
