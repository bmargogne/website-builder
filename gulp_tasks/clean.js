var clean = require('gulp-clean');
var gulp = require('gulp');

var config = require('../config.json')

gulp.task('clean', function () {

    console.log( "function clear" );

    return gulp.src( config.distFiles , {read: false})
        .pipe(clean());

});