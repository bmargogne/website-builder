// npm packages
const _if = require('gulp-if');
const gulp = require('gulp');
const newer = require('gulp-newer');
const using = require('gulp-using');
const rename = require('gulp-rename');
const runSequence = require('run-sequence');
const imagemin = require('gulp-imagemin');
const watch = require('gulp-watch');

// imports
const config = require('./_config.json');
const processBitmaps = config.buildingSteps.processBitmaps

// task
gulp.task('imgBitmaps', () => {
	if (processBitmaps) {


		// globs
		const SRC = `${config.src}/${config.images.srcBitmaps}`;
		const EXCLUDE = `!${config.src}/${config.vendors.src}/`;
		const DEST = `${config.dest}/${config.images.destBitmaps}/`;

		console.log(`Images Bitmaps : ${SRC} --> ${DEST}, excluding ${EXCLUDE}`);

		const isTest = config.env.isTest;
		const isProd = config.env.isProd;

		return gulp.src( [SRC, EXCLUDE], { ignoreInitial: false })
			.pipe(				rename( {dirname: ''}))
			.pipe(				newer( DEST ))
			.pipe( _if(isTest,	using( {prefix:'[images/bitmaps] compressing :', color:'magenta', filesize:true} )))
			.pipe( _if(isProd,	imagemin()))
			.pipe(				gulp.dest(DEST));
	}
	return;
});

// watch
gulp.task('watch-imgBitmaps', () => {
	if (processBitmaps) {

		// globs
		const SRC = `${config.src}/${config.images.srcBitmaps}`;
		const EXCLUDE = `!${config.src}/${config.vendors.src}/`;

		console.log(`Watching bitmap images : ${SRC}, except for ${EXCLUDE}`);

		return watch( [SRC, EXCLUDE], () => {
			runSequence('imgBitmaps', 'liveReload');
		});
	}
	return;
})
