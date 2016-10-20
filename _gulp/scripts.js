// npm packages
const concat = require('gulp-concat');
const gulp = require('gulp');
const newer = require('gulp-newer');
const plumber = require('gulp-plumber');
const runSequence = require('run-sequence');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');  					// https://www.npmjs.com/package/gulp-uglify
const using = require('gulp-using');						// https://www.npmjs.com/package/gulp-using
const watch = require('gulp-watch');

// imports
const config = require('./_config.json');
const processScripts = config.buildingSteps.processScripts;

// task
gulp.task('scripts', () => {
	if (processScripts) {

		const SCRIPTFILE = config.scripts.scriptfile;

		// globs
		const SRC = `${config.src}/${config.scripts.src}`;
		const EXCLUDE = `!${config.src}/${config.vendors.src}/`;
		const DEST = `${config.dest}/${config.scripts.dest}/`;

		console.log(`Scripts building : ${SRC} --> ${DEST}${SCRIPTFILE}, excluding ${EXCLUDE}`);

		return gulp.src( [SRC, EXCLUDE], { ignoreInitial: false })
			.pipe( plumber() )
			.pipe( sourcemaps.init())
			.pipe( newer( DEST + SCRIPTFILE ))
			.pipe( using( {prefix:'[scripts] concatenating :', color:'green', filesize:true} ))
			.pipe( concat ( SCRIPTFILE ))
			.pipe( uglify() )
			.pipe( using( {prefix:'[scripts] done :', color:'green', filesize:true} ))
			.pipe( sourcemaps.write('maps'))
			.pipe( gulp.dest( DEST ));
	}
	return;
});

// watch
gulp.task('watch-scripts', () => {
	if (processScripts) {

		// globs
		const SRC = `${config.src}/${config.scripts.src}`;
		const EXCLUDE = `!${config.src}/${config.vendors.src}/`;

		console.log(`Watching scripts : ${SRC}, except for ${EXCLUDE}`);

		return watch( [SRC, EXCLUDE], () => {
			runSequence('scripts', 'liveReload');
		});
	}
	return;
});
