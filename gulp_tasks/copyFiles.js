var gulp = require('gulp');
var dest = require('gulp-dest');
var rename = require('gulp-rename');
var changed = require('gulp-changed');

var config = require('../config.json');

gulp.task('copyFiles', function () {

    var SRC = `${config.src}/${config.files.src}`;
    var DEST = `${config.dist}/${config.files.dest}`;

    console.log(SRC + " " + DEST);

    return gulp.src( SRC )
        .pipe( rename( {dirname: ''}))                              // removes path to put all files in same folder (prevent directory tree duplication)
        .pipe( changed( DEST ))                                     // apply the process only if SRC file is newer than DEST file
        .pipe( dest( DEST))

});