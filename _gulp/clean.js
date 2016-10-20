const clean = require('gulp-clean');
const gulp = require('gulp');

const config = require('../config.json')

// empty the "dest" directory to ensure all present files are newly generated
gulp.task('clean', () => {

	const SRC = `${config.dest}`;
	const TMP = `${config.temp}`;

	return gulp.src( [SRC, TMP] , {read: false})
		.pipe(clean());

});