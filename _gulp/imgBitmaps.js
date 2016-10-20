// npm packages
const gulp = require('gulp');
const newer = require('gulp-newer');
const using = require('gulp-using');
const rename = require('gulp-rename');
const runSequence = require('run-sequence');
const imagemin = require('gulp-imagemin');
const watch = require('gulp-watch');

// imports
const config = require('./_config.json');

// globs
const SRC = `${config.src}/${config.images.srcBitmaps}`;
const EXCLUDE = `!${config.src}/${config.vendors.src}/`;
const DEST = `${config.dest}/${config.images.destBitmaps}/`;

// task
gulp.task('imgBitmaps', () => {
	console.log(`Images Bitmaps : ${SRC} --> ${DEST}, excluding ${EXCLUDE}`);

	return gulp.src( [SRC, EXCLUDE], { ignoreInitial: false })
		.pipe( rename( {dirname: ''}))
		.pipe( newer( DEST ))
		.pipe( using( {prefix:'[images/bitmaps] compressing :', color:'magenta', filesize:true} ))
		.pipe( imagemin())
		.pipe( gulp.dest(DEST));
});

// watch
gulp.task('watch-imgBitmaps', () => {
	console.log(`Watching bitmap images : ${SRC}, except for ${EXCLUDE}`);

	return watch( [SRC, EXCLUDE], () => {
		runSequence('imgBitmaps', 'liveReload');
	});
})
