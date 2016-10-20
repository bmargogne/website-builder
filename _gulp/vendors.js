const gulp = require('gulp');
const newer = require('gulp-newer');
const rename = require('gulp-rename');
const using = require('gulp-using');
const watch = require('gulp-watch');

const config = require('./_config.json');

gulp.task('vendors', function () {

	const SRC = `${config.src}/${config.vendors.src}`;
	const DEST = `${config.dest}/${config.vendors.dest}/`;

	console.log(`copy Vendors Assets : ${SRC} --> ${DEST}`);

	return watch( SRC, { ignoreInitial: false })
		.pipe( newer( DEST ))
		.pipe( using( {prefix:'[vendors] copying :', color:'red', filesize:true} ))
		.pipe( gulp.dest( DEST ));
});
