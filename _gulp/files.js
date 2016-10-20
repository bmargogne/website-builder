// npm packages
const gulp = require('gulp');
const newer = require('gulp-newer');
const rename = require('gulp-rename');
const runSequence = require('run-sequence');
const using = require('gulp-using');
const watch = require('gulp-watch');

// imports
const config = require('./_config.json');
const processFiles = config.buildingSteps.processFiles;

// task
gulp.task('files', () => {
	if (processFiles) {

		// globs
		const SRC = `${config.src}/${config.files.src}`;
		const EXCLUDE = `!${config.src}/${config.vendors.src}`;
		const DEST = `${config.dest}/${config.files.dest}/`;

		console.log(`Files simple copy: ${SRC} --> ${DEST}, excluding ${EXCLUDE}`);

		return gulp.src( [SRC, EXCLUDE], { ignoreInitial: false })
			.pipe( rename( path => { path.dirname = ''}))
			.pipe( newer( DEST ))
			.pipe( using( {prefix:'[files] copying :', color:'blue', filesize:true} ))
			.pipe( gulp.dest( DEST ));
	}
	return;
});

// watch
gulp.task('watch-files', () => {
	if (processFiles) {

		// globs
		const SRC = `${config.src}/${config.files.src}`;
		const EXCLUDE = `!${config.src}/${config.vendors.src}`;

		console.log(`Watching files : ${SRC}, except for ${EXCLUDE}`);

		return watch( [SRC, EXCLUDE], (event) => {
			runSequence('files', 'liveReload');
		});
	}
	return;
})
