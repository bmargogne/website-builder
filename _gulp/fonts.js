// npm packages
const _if = require('gulp-if');
const gulp = require('gulp');
const newer = require('gulp-newer');
const rename = require('gulp-rename');
const runSequence = require('run-sequence');
const using = require('gulp-using');
const watch = require('gulp-watch');

// imports
const co = require('./_config.json');
const processFonts = co.buildingSteps.processFonts;

// task
gulp.task('fonts', () => {
	if (processFonts) {

		// globs
		const SRC = `${co.src}/${co.fonts.src}`;
		const EXCLUDE1 = `!${co.src}/${co.exclude}`;
		const EXCLUDE2 = `!${co.src}/${co.vendors.src}`;
		const DEST = `${co.dest}/${co.fonts.dest}/`;
		console.log(`Fonts simple copy : [${SRC}] --> [${DEST}], excluding [${EXCLUDE1}] and [${EXCLUDE2}]`);

		const isTest = co.env.isTest;

		return gulp.src( [SRC, EXCLUDE1, EXCLUDE2], { ignoreInitial: false })
			.pipe(				rename( {dirname: ''} ))
			.pipe(				newer( DEST ))
			.pipe( _if(isTest,	using( {prefix:'[fonts] copying :', color:'gray', filesize:true} )))
			.pipe(				gulp.dest( DEST ));
	}
	return;
});

// watch
gulp.task('watch-fonts', () => {
	if (processFonts) {

		const SRC = `${co.src}/${co.fonts.src}`;
		const EXCLUDE1 = `!${co.src}/${co.exclude}`;
		const EXCLUDE2 = `!${co.src}/${co.vendors.src}`;
		console.log(`Watching fonts : [${SRC}], except for [${EXCLUDE}]`);

		return watch( [SRC, EXCLUDE1, EXCLUDE2], (event) => {
			runSequence('fonts', 'liveReload');
		});
	}
	return;
})
