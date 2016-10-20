const gulp = require('gulp');
const newer = require('gulp-newer');
const rename = require('gulp-rename');
const using = require('gulp-using');
const watch = require('gulp-watch');

const config = require('./config.json');


// copy files looks for anything under directory name "files" and copy it raw.
// useful for any file available for download
gulp.task('vendors', function () {

	const SRC = `${config.src}/${config.vendors.src}`;
	const DEST = `${config.dest}/${config.vendors.dest}/`;

	console.log(`copy Vendors Assets : ${SRC} --> ${DEST}`);

	return watch( SRC, { ignoreInitial: false })
		.pipe( newer( DEST ))                                // do not include files that are older than thoses DEST folder
		// .pipe( rename( path => { path.dirname = ''}))        // removes path to put all files in same folder (prevent directory tree duplication)
		.pipe( using( {prefix:'[vendors] using :', color:'gray', filesize:true}) )
		.pipe( gulp.dest( DEST ));
});
