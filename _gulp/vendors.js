// npm packages
const gulp = require('gulp');
const newer = require('gulp-newer');
const runSequence = require('run-sequence');
const using = require('gulp-using');
const watch = require('gulp-watch');

// imports
const config = require('./_config.json');
const processVendors = config.buildingSteps.processVendors;

// globs
const SRC = `${config.src}/${config.vendors.src}`;
const DEST = `${config.dest}/${config.vendors.dest}/`;

// task
gulp.task('vendors', () => {
	if (processVendors) {
		console.log(`Vendors copying : ${SRC} --> ${DEST}`);

		return gulp.src( SRC, { ignoreInitial: false })
			.pipe( newer( DEST ))
			.pipe( using( {prefix:'[vendors] copying :', color:'red', filesize:true} ))
			.pipe( gulp.dest( DEST ));
		}
	return;
});

// watch
gulp.task('watch-vendors', () => {
	if (processVendors) {
		console.log(`Watching Vendors elements : ${SRC}`);

		return watch( [SRC], () => {
			runSequence('vendors', 'liveReload');
		});
	}
	return;
})
