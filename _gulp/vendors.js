// npm packages
const _if = require('gulp-if');
const gulp = require('gulp');
const newer = require('gulp-newer');
const runSequence = require('run-sequence');
const using = require('gulp-using');
const watch = require('gulp-watch');

// imports
const co = require('./_config.json');
const processVendors = co.buildingSteps.processVendors;

// task
gulp.task('vendors', () => {
	if (processVendors) {

		// globs
		const SRC = `${co.src}/${co.vendors.src}`;
		const DEST = `${co.dest}/${co.vendors.dest}/`;
		const EXCLUDE = `!${co.dest}/${co.exclude}/`;
		console.log(`Vendors copying : ${SRC} --> ${DEST}`);

		const isTest = co.env.isTest;

		return gulp.src( [SRC, EXCLUDE], { ignoreInitial: false })
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
		const SRC = `${co.src}/${co.vendors.src}`;
		const EXCLUDE = `!${co.src}/${co.vendors.src}`;
		console.log(`Watching Vendors elements : [${SRC}], except for [${EXCLUDE}]`);

		return watch( [SRC, EXCLUDE], () => {
			runSequence('vendors', 'liveReload');
		});
	}
	return;
})
