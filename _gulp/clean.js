const clean = require('gulp-clean');
const gulp = require('gulp');

const config = require('./_config.json')

gulp.task('clean', () => {

	const SRC = `${config.dest}`;
	const TMP = `${config.temp}`;

	return gulp.src( [SRC, TMP] , {read: false})
		.pipe( clean());

});