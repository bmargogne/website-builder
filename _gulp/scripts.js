// npm packages
const _if = require('gulp-if');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const gulp = require('gulp');
const insert = require('gulp-insert');
const minify = require('gulp-minify');
const newer = require('gulp-newer');
const plumber = require('gulp-plumber');
const runSequence = require('run-sequence');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');  					// https://www.npmjs.com/package/gulp-uglify
const using = require('gulp-using');						// https://www.npmjs.com/package/gulp-using
const watch = require('gulp-watch');

// imports
const co = require('./_config.json');
const processScripts = co.buildingSteps.processScripts;
const wrapIt = co.buildingSteps.processScripts;
const mini = co.buildingSteps.minifyScript;

// task
gulp.task('scripts', () => {
	if (processScripts) {

		// globs
		const SRC = `${co.src}/${co.scripts.src}`;
		const EXCLUDE1 = `!${co.src}/${co.exclude}/`;
		const EXCLUDE2 = `!${co.src}/${co.vendors.src}/`;
		const DEST = `${co.dest}/${co.scripts.dest}/`;
		const SCRIPTFILE = co.scripts.scriptfile;
		console.log(`Scripts building : [${SRC}] --> [${DEST}${SCRIPTFILE}], excluding [${EXCLUDE1}] and [${EXCLUDE2}]`);

		// imports
		const isProd = co.env.isProd;
		const isTest = co.env.isTest;
		const es6mode = co.env.es6;

		console.log(wrapIt);

		return gulp.src( [SRC, EXCLUDE1, EXCLUDE2], { ignoreInitial: false })
			.pipe( _if( mini,	sourcemaps.init() ))
			.pipe( _if( es6mode,babel({ presets: ['es2015'] })))
			.pipe( 				plumber() )
			.pipe( 				newer( DEST + SCRIPTFILE ))
			.pipe( _if( isTest, using({ prefix:'[scripts] concatenating :', color:'green', filesize:true })))
			.pipe( 				concat ( SCRIPTFILE ))
			.pipe( _if( wrapIt,	insert.wrap( co.scripts.wrapper.before, co.scripts.wrapper.after )))
			.pipe( _if( mini,	minify({ ext: {src:'-debug.js', min:'.js'} })))
			.pipe( _if( isTest,	using({ prefix:'[scripts] done :', color:'green', filesize:true })))
			.pipe( _if( mini,	sourcemaps.write('./')))
			.pipe(				plumber.stop() )
			.pipe(				gulp.dest( DEST ));
	}
	return;
});

// watch
gulp.task('watch-scripts', () => {
	if (processScripts) {

		// globs
		const SRC = `${co.src}/${co.scripts.src}`;
		const EXCLUDE1 = `!${co.src}/${co.exclude}/`;
		const EXCLUDE2 = `!${co.src}/${co.vendors.src}/`;
		console.log(`Watching scripts : [${SRC}], except for [${EXCLUDE1}] and [${EXCLUDE2}]`);

		return watch( [SRC, EXCLUDE1, EXCLUDE2], () => {
			runSequence('scripts', 'liveReload');
		});
	}
	return;
});

