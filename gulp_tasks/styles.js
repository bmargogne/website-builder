const concat = require('gulp-continuous-concat');
const gulp = require('gulp');
const using = require('gulp-using');
const watch = require('gulp-watch');

const config = require('../config.json');

gulp.task('styles', () => {

    const SRC = `${config.src}/${config.styles.src}`;
    const DEST = `${config.dist}/${config.styles.dest}/`;
    const STYLESHEET = config.styles.stylesheet;

    console.log(`styles : ${SRC} --> ${DEST}${STYLESHEET}`);

    return watch( SRC , { ignoreInitial: false })
        .pipe( using( {prefix:'[styles] using :', color:'yellow', filesize:true} ) )                    // list input stylesheet
        .pipe( concat ( STYLESHEET ) )                                                                  // create a single files
        .pipe( using( {prefix:'[styles] done :', color:'yellow', filesize:true} ) )                    // list the concatenated file
        .pipe( gulp.dest( DEST ) );
});
