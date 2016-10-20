// npm packages
const concat = require('gulp-concat');
const gulp = require('gulp');
const newer = require('gulp-newer');
const runSequence = require('run-sequence');
const using = require('gulp-using');
const watch = require('gulp-watch');

// imports
const config = require('./_config.json');
const SCRIPTFILE = config.scripts.scriptfile;

// globs
const SRC = `${config.src}/${config.scripts.src}`;
const EXCLUDE = `!${config.src}/${config.vendors.src}/`;
const DEST = `${config.dest}/${config.scripts.dest}/`;

// task
gulp.task('scripts', () => {
	console.log(`Scripts building : ${SRC} --> ${DEST}${SCRIPTFILE}, excluding ${EXCLUDE}`);

	return gulp.src( [SRC, EXCLUDE], { ignoreInitial: false })
		.pipe( newer( DEST + SCRIPTFILE ))
		.pipe( using( {prefix:'[scripts] concatenating :', color:'green', filesize:true} ))
		.pipe( concat ( SCRIPTFILE ))
		.pipe( using( {prefix:'[scripts] done :', color:'green', filesize:true} ))
		.pipe( gulp.dest( DEST ));
});

// watch
gulp.task('watch-scripts', () => {
	console.log(`Watching scripts : ${SRC}, excluding ${EXCLUDE}`);

	return watch( [SRC, EXCLUDE], () => {
		runSequence('scripts', 'liveReload');
	});
});
