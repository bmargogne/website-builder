var dest = require('gulp-dest');
var gulp = require('gulp');
var rename = require('gulp-rename');
var using = require('gulp-using');
var watch = require('gulp-watch');

var config = require('../config.json');

gulp.task('styles', function () {

    var SRC = `${config.src}/${config.styles.src}`;
    var DEST = `${config.dist}/${config.styles.dest}/`;

    console.log(`styles : ${SRC} --> ${DEST}`);

    return watch( SRC , { ignoreInitial: false })
        .pipe( using() )
        .pipe( rename(function (path) { path.dirname = ''}))        // removes path to put all files in same folder (prevent directory tree duplication)
        .pipe( dest( DEST ) )
        .pipe( gulp.dest('./') );
});