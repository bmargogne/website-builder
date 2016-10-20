// npm packages
const gulp = require('gulp');
const newer = require('gulp-newer');
const rename = require('gulp-rename');
const runSequence = require('run-sequence');
const using = require('gulp-using');
const watch = require('gulp-watch');

// imports
const config = require('./_config.json');

// globs
const SRC = `${config.src}/${config.fonts.src}`;
const EXCLUDE = `!${config.src}/${config.vendors.src}`;
const DEST = `${config.dest}/${config.fonts.dest}/`;

// task
gulp.task('fonts', () => {
	console.log(`Fonts simple copy : ${SRC} --> ${DEST}, excluding ${EXCLUDE}`);

	return gulp.src( [SRC, EXCLUDE], { ignoreInitial: false })
		.pipe( rename( {dirname: ''} ))
		.pipe( newer( DEST ))
		.pipe( using( {prefix:'[fonts] copying :', color:'gray', filesize:true} ))
		.pipe( gulp.dest( DEST ));
});

// watch
gulp.task('watch-fonts', () => {
	console.log(`Watching fonts : ${SRC}`);

	return watch( [SRC, EXCLUDE], (event) => {
		runSequence('fonts', 'liveReload');
	});
})
