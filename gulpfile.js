const gulp = require('gulp');
const runSequence = require('run-sequence');

const starter = require('./_gulp/_starter');

gulp.task('default', function () {

	// run 'gulp' for default building sequence
	// run 'gulp --profile={profileType}' for a specific building sequence
	// {profilType} can be builder, tester ... ( not fonctionnal)

    return runSequence('_starter');
});
