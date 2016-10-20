// npm packages
const clean = require('gulp-clean');
const gulp = require('gulp');

// imports
const config = require('./_config.json')

// globs
const SRC = `${config.dest}`;
const TMP = `${config.temp}`;

// task
gulp.task('clean', () => {
	console.log(`Cleaning folders : ${SRC} and ${TMP}`)

	return gulp.src( [SRC, TMP] , {read: false})
		.pipe( clean());
});