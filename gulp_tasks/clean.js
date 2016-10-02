var clean = require('gulp-clean');
var gulp = require('gulp');

var config = require('../config.json')

gulp.task('clean', function () {

    var SRC = `${config.dist}/*`;

    return gulp.src( SRC , {read: false})
        .pipe(clean());

});