const clean = require('gulp-clean');
const gulp = require('gulp');

const config = require('../config.json')

// empty the "dist" directory to ensure all present files are newly generated
gulp.task('clean', () => {

	const SRC = `${config.dist}/*`;

	return gulp.src( SRC , {read: false})
		.pipe(clean());

});