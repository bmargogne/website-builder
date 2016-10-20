const gulp = require('gulp');
const newer = require('gulp-newer');
const using = require('gulp-using');
const rename = require('gulp-rename');
const imageoptimization = require('gulp-imagemin');

const config = require('./_config.json');

gulp.task('imgBitmaps', function () {

	const SRC = `${config.src}/${config.images.srcBitmaps}`;
	const EXCLUDE = `!${config.src}/${config.vendors.src}/`;
	const DEST = `${config.dest}/${config.images.destBitmaps}/`;

	console.log(`Images Bitmaps : ${SRC} --> ${DEST}`);
	console.log(`Images Bitmaps excludes : ${EXCLUDE}`);

	return watch( [SRC, EXCLUDE], { ignoreInitial: false })
		.pipe( rename( {dirname: ''}))
		.pipe( newer( DEST ))
		.pipe( using( {prefix:'[images/bitmaps] using :', color:'magenta', filesize:true} ))
        .pipe( imagemin())
        .pipe( gulp.dest(DEST));
});
