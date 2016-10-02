const gulp = require('gulp');
const runSequence = require('run-sequence');

const profiles = require('./gulp_tasks/profiles')


gulp.task('default', function () {

    return runSequence('profiles');
});
