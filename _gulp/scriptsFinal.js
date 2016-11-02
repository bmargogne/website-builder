// npm packages
const _if = require('gulp-if');								// https://www.npmjs.com/package/gulp-if
const babel = require('gulp-babel');						// https://www.npmjs.com/package/gulp-babel
const concat = require('gulp-concat');						// https://www.npmjs.com/package/gulp-concat
const gulp = require('gulp');								// http://gulpjs.com/
const minify = require('gulp-minify');						// https://www.npmjs.com/package/gulp-minify
const newer = require('gulp-newer');						// https://www.npmjs.com/package/gulp-newer
const plumber = require('gulp-plumber');					// https://www.npmjs.com/package/gulp-plumber
const sourcemaps = require('gulp-sourcemaps');				// https://www.npmjs.com/package/gulp-sourcemaps
const using = require('gulp-using');						// https://www.npmjs.com/package/gulp-using

// imports
const co = require('./_config.json');
const processScripts = co.buildingSteps.processScripts;

// task : JS files are wrapped in a 'document ready' jquery, hence use it for client side only
gulp.task('scriptsFinal', () => {
	if (processScripts) {

		// globs
		const SRC = `${co.temp}/${co.scripts.srcJs}`;		
		const DEST = `${co.dest}/${co.scripts.dest}/`;
		const SCRIPTFILE = co.scripts.scriptfile;
		console.log(`Scripts Final : [${SRC}] --> [${DEST}${SCRIPTFILE}]`);

		// imports
		const isTest = co.env.isTest;
		const es6mode = co.env.es6;
		let isProd = co.env.isProd;
		const plumbing = co.buildingSteps.plumbing; 

		return gulp.src( [SRC], { ignoreInitial: false })
			.pipe(					newer( DEST + SCRIPTFILE ))
			.pipe( _if( isTest, 	using({ prefix:'[scripts/final] using :', color:'green', filesize:true })))
			.pipe( _if( plumbing,	plumber() ))
			
			.pipe( _if( isProd,		sourcemaps.init() ))
			.pipe(					concat ( SCRIPTFILE ))
			.pipe( _if( es6mode,	babel({ presets: ['es2015'] })))
			.pipe( _if( isProd,		minify({ ext:{src:'.nomin.js', min:'.js', noSource:true} })))
			.pipe( _if( isProd,		sourcemaps.write('./')))
			
			.pipe( _if( plumbing,	plumber.stop() ))
			.pipe(					gulp.dest( DEST ))
			.pipe( _if( isTest,		using({ prefix:'[scripts/final] done :', color:'green', filesize:true })));
	}
	return;
});

