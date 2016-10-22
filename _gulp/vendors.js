// npm packages
const _if = require('gulp-if');						// https://www.npmjs.com/package/gulp-if
const gulp = require('gulp');						// http://gulpjs.com/
const newer = require('gulp-newer');				// https://www.npmjs.com/package/gulp-newer
const runSequence = require('run-sequence');		// https://www.npmjs.com/package/run-sequence
const using = require('gulp-using');				// https://www.npmjs.com/package/gulp-using
const watch = require('gulp-watch');				// https://www.npmjs.com/package/gulp-watch

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
