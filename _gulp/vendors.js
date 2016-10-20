// npm packages
const _if = require('gulp-if');
const gulp = require('gulp');
const newer = require('gulp-newer');
const runSequence = require('run-sequence');
const using = require('gulp-using');
const watch = require('gulp-watch');

// imports
const config = require('./_config.json');
const processVendors = config.buildingSteps.processVendors;

// task
gulp.task('vendors', () => {
	if (processVendors) {

		// globs
		const SRC = `${config.src}/${config.vendors.src}`;
		const DEST = `${config.dest}/${config.vendors.dest}/`;

		console.log(`Vendors copying : ${SRC} --> ${DEST}`);

		const isTest = config.env.isTest;

		return gulp.src( SRC, { ignoreInitial: false })
			.pipe(				newer( DEST ))
			.pipe( _if( isTest,	using( {prefix:'[vendors] copying :', color:'red', filesize:true} )))
			.pipe(				gulp.dest( DEST ));
		}
	return;
});

// watch
gulp.task('watch-vendors', () => {
	if (processVendors) {

		// globs
		const SRC = `${config.src}/${config.vendors.src}`;

		console.log(`Watching Vendors elements : ${SRC}`);

		return watch( [SRC], () => {
			runSequence('vendors', 'liveReload');
		});
	}
	return;
})
