'use strict';

const gulp = require('gulp');
const runSequence = require('run-sequence');

const starter = require('./_gulp/_starter');	 // eslint-disable-line

gulp.task('default', function () {

	// run 'gulp' for default building sequence
	return runSequence('_starter');
});
