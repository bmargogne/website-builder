// npm packages
const gulp = require('gulp');
const fileinclude = require('gulp-file-include');
const newer = require('gulp-newer');
const runSequence = require('run-sequence');
const using = require('gulp-using');
const watch = require('gulp-watch');

// imports
const config = require('./_config.json');
const processPages = config.buildingSteps.processPages;

// task
gulp.task('pagesHtml', () => {
	if (processPages) {

		// globs
		const SRC = `${config.src}/${config.pages.src}`;
		const EXCLUDE1 = `!${config.src}/${config.pages.partials}`;
		const EXCLUDE2 = `!${config.src}/${config.vendors.src}`;
		const DEST = `${config.dest}/`;

		console.log(`Html Pages building : ${SRC} --> ${DEST}, excluding ${EXCLUDE1} and ${EXCLUDE2}`);

		return gulp.src( [SRC, EXCLUDE1, EXCLUDE2], { ignoreInitial: false } )
			.pipe( newer( DEST )) // if activated, modifying partials will not rebuild the calling pages
			.pipe( using( {prefix:'[pages/html] building :', color:'cyan', filesize:true} ))
			.pipe( fileinclude({
				prefix: '@@',
				basepath: config.src
			}))
			.pipe( using( {prefix:'[pages/html] done building :', color:'cyan', filesize:true} ))
			.pipe( gulp.dest( DEST ));
	}
	return;
});

// watch
gulp.task('watch-pagesHtml', () => {
	if (processPages) {

		// globs
		const SRC = `${config.src}/${config.pages.src}`;
		const EXCLUDE2 = `!${config.src}/${config.vendors.src}`;

		console.log(`Watching Html Pages : ${SRC}, except for ${EXCLUDE2}`);

		return watch( [SRC, EXCLUDE2], () => {
			runSequence('pagesHtml', 'liveReload');
		});
	}
	return;
});
