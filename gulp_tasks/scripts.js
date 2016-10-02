const concat = require('gulp-continuous-concat');
const gulp = require('gulp');
const using = require('gulp-using');
const watch = require('gulp-watch');

const config = require('../config.json');

gulp.task('scripts', () => {

    const SRC = `${config.src}/${config.scripts.src}`;
    const DEST = `${config.dist}/${config.scripts.dest}/`;
    const SCRIPTFILE = config.scripts.scriptfile;

    console.log(`scripts : ${SRC} --> ${DEST}${SCRIPTFILE}`);

    return watch( SRC , { ignoreInitial: false })
        .pipe( using( {prefix:'[scripts] using :', color:'green', filesize:true} ))     // list input stylesheet
        .pipe( concat ( SCRIPTFILE ) )                                                  // create a single files
        .pipe( using( {prefix:'[scripts] done :', color:'green', filesize:true} ))      // list the concatenated file
        .pipe( gulp.dest( DEST ) );
});