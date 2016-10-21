// npm packages
const _if = require('gulp-if');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const gulp = require('gulp');
const minify = require('gulp-minify');
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

		// globs
		const SRC = `${config.src}/${config.scripts.src}`;
		const EXCLUDE = `!${config.src}/${config.vendors.src}/`;
		const DEST = `${config.dest}/${config.scripts.dest}/`;
		const SCRIPTFILE = config.scripts.scriptfile;
		console.log(`Scripts building : ${SRC} --> ${DEST}${SCRIPTFILE}, excluding ${EXCLUDE}`);

		// imports
		const isProd = config.env.isProd;
		const isTest = config.env.isTest;
		const es6mode = config.env.es6;

		return gulp.src( [SRC, EXCLUDE], { ignoreInitial: false })
			.pipe( _if( isProd, sourcemaps.init() ))
			.pipe( _if( es6mode, babel({ presets: ['es2015'] })))
			.pipe( plumber() )
			.pipe( newer( DEST + SCRIPTFILE ))
			.pipe( _if( isTest, using({ prefix:'[scripts] concatenating :', color:'green', filesize:true })))
			.pipe( concat ( SCRIPTFILE ))
			.pipe( _if( isProd, minify({ ext: {src:'-debug.js', min:'.js'} })))
			.pipe( _if( isTest, using({ prefix:'[scripts] done :', color:'green', filesize:true })))
			.pipe( _if( isProd, sourcemaps.write('./')))
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
