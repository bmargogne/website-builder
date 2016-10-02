var dest = require('gulp-dest');
var gulp = require('gulp');
var rename = require('gulp-rename');
var using = require('gulp-using');
var watch = require('gulp-watch');

var config = require('../config.json');

gulp.task('copyFiles', function () {

    var SRC = `${config.src}/${config.files.src}`;
    var DEST = `${config.dist}/${config.files.dest}/`;

    console.log(`copyFile : ${SRC} --> ${DEST}`);

/*
    return gulp.src( SRC )
        .pipe( using() )
        .pipe( rename(function (path) { path.dirname = ''}))           // removes path to put all files in same folder (prevent directory tree duplication)
        // .pipe( changed( DEST ))                                     // apply the process only if SRC file is newer than DEST file
        .pipe( dest( DEST ))
        .pipe( gulp.dest('./'));
*/

    return watch( SRC, { ignoreInitial: false })
        .pipe( using() )
        .pipe( rename(function (path) { path.dirname = ''}))        // removes path to put all files in same folder (prevent directory tree duplication)
        // .pipe( changed( DEST ))                                     // apply the process only if SRC file is newer than DEST file
        .pipe( dest( DEST ))
        .pipe( gulp.dest('./'));
});
