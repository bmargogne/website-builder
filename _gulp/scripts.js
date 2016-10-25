// npm packages
const _if = require('gulp-if');								// https://www.npmjs.com/package/gulp-if
const babel = require('gulp-babel');						// https://www.npmjs.com/package/gulp-babel
const buffer = require('vinyl-buffer');
const concat = require('gulp-concat');						// https://www.npmjs.com/package/gulp-concat
const gulp = require('gulp');								// http://gulpjs.com/
const insert = require('gulp-insert');						// https://www.npmjs.com/package/gulp-concat
const minify = require('gulp-minify');						// https://www.npmjs.com/package/gulp-minify
const newer = require('gulp-newer');						// https://www.npmjs.com/package/gulp-newer
const plumber = require('gulp-plumber');					// https://www.npmjs.com/package/gulp-plumber
const runSequence = require('run-sequence');				// https://www.npmjs.com/package/run-sequence
const sourcemaps = require('gulp-sourcemaps');				// https://www.npmjs.com/package/gulp-sourcemaps
const uglify = require('gulp-uglify');						// https://www.npmjs.com/package/gulp-uglify
const using = require('gulp-using');						// https://www.npmjs.com/package/gulp-using
const watch = require('gulp-watch');						// https://www.npmjs.com/package/gulp-watch

// imports
const co = require('./_config.json');
const processScripts = co.buildingSteps.processScripts;

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
		const isTest = co.env.isTest;
		const es6mode = co.env.es6;
		let isProd = co.env.isProd;
		const plumbing = co.buildingSteps.plumbing; 
		const before = co.scripts.wrapper.before;
		const after  = co.scripts.wrapper.after;


		return gulp.src( [SRC, EXCLUDE1, EXCLUDE2], { ignoreInitial: false })
			.pipe( _if( plumbing,	plumber() ))
			.pipe(					newer( DEST + SCRIPTFILE ))
			.pipe( _if( isTest, 	using({ prefix:'[scripts] concatenating :', color:'green', filesize:true })))
			
			.pipe( _if( isProd,		sourcemaps.init() ))
			.pipe(					concat ( SCRIPTFILE ))
			.pipe(					insert.wrap( before, after ))
			.pipe( _if( es6mode,	babel({ presets: ['es2015'] })))
			.pipe( _if( isProd,		minify({ ext:{src:'.nomin.js', min:'.js', noSource:true} })))
			.pipe( _if( isProd,		sourcemaps.write('./')))
			
			.pipe( _if( isTest,		using({ prefix:'[scripts] done :', color:'green', filesize:true })))
			.pipe( _if( plumbing,	plumber.stop() ))
			.pipe(					gulp.dest( DEST ));
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

