// npm packages
const _if = require('gulp-if');								// https://www.npmjs.com/package/gulp-if
const gulp = require('gulp');								// http://gulpjs.com/
const newer = require('gulp-newer');						// https://www.npmjs.com/package/gulp-newer
const rename = require('gulp-rename');						// https://www.npmjs.com/package/gulp-rename
const runSequence = require('run-sequence');				// https://www.npmjs.com/package/run-sequence
const using = require('gulp-using');						// https://www.npmjs.com/package/gulp-using
const watch = require('gulp-watch');						// https://www.npmjs.com/package/gulp-watch

// imports
const co = require('./_config.json');
const processFiles = co.buildingSteps.processFiles;

// task
gulp.task('files', () => {
	if (processFiles) {

		// globs
		const SRC = `${co.src}/${co.files.src}`;
		const EXCLUDE1 = `!${co.src}/${co.exclude}`;
		const EXCLUDE2 = `!${co.src}/${co.vendors.src}`;
		const DEST = `${co.dest}/${co.files.dest}/`;
		console.log(`Files simple copy: [${SRC}] --> [${DEST}], excluding [${EXCLUDE1}] and [${EXCLUDE2}]`);

		const isTest = co.env.isTest;

		return gulp.src( [SRC, EXCLUDE1, EXCLUDE2], { ignoreInitial: false })
			.pipe(				rename( path => { path.dirname = ''}))
			.pipe(				newer( DEST ))
			.pipe( _if(isTest,	using( {prefix:'[files] copying :', color:'blue', filesize:true} )))
			.pipe(				gulp.dest( DEST ));
	}
	return;
});

// watch
gulp.task('watch-files', () => {
	if (processFiles) {

		// globs
		const SRC = `${co.src}/${co.files.src}`;
		const EXCLUDE1 = `!${co.src}/${co.exclude}`;
		const EXCLUDE2 = `!${co.src}/${co.vendors.src}`;
		console.log(`Watching files : [${SRC}], except for [${EXCLUDE1}] and [${EXCLUDE2}]`);

		return watch( [SRC, EXCLUDE1, EXCLUDE2], (event) => {
			runSequence('files', 'liveReload');
		});
	}
	return;
})
