var fileinclude = require('gulp-file-include');
var gulp = require('gulp');
var gulpif = require ('gulp-if');
var newer = require('gulp-newer');
var plumber = require('gulp-plumber');
var size = require('gulp-filesize');
var using = require('gulp-using');

var config = require('./config.json');


// BUILDING PAGES : Generates HTML, PHP and other from various partial files
gulp.task('pages', function () {

    var SRC = config.pages.src;
    var PARTIALS = config.pages.partials;

    return gulp.src( [SRC, "!" + RAW, "!" + PARTIALS] )                           // exclude files which should be left untouched (eg external scripts) or partials
        .pipe( gulpif( config.test.onlynewer, newer(DEST + config.pages.src) ))   // enter the process only if at least one SRC files is newer than generated files
        .pipe( fileinclude({                                                      // process file includes in SRC html (partials or variables allocation...)
            prefix: '@@',
            basepath: src
        }))
        .pipe( gulp.dest(config.pages.target) );
});