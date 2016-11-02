// npm packages
const _if = require('gulp-if');								// https://www.npmjs.com/package/gulp-if
// const babel = require('gulp-babel');						// https://www.npmjs.com/package/gulp-babel
const concat = require('gulp-concat');						// https://www.npmjs.com/package/gulp-concat
const gulp = require('gulp');								// http://gulpjs.com/
const newer = require('gulp-newer');						// https://www.npmjs.com/package/gulp-newer
const plumber = require('gulp-plumber');					// https://www.npmjs.com/package/gulp-plumber
const ts = require('gulp-typescript');
const using = require('gulp-using');						// https://www.npmjs.com/package/gulp-using

const tsProject = ts.createProject('tsconfig.json');

// imports
const co = require('./_config.json');
const processScripts = co.buildingSteps.processScripts;

// task : JS files are wrapped in a 'document ready' jquery, hence use it for client side only
gulp.task('scriptsTS', () => {
	if (processScripts) {

		// globs
		const SRC = `${co.src}/${co.scripts.srcTs}`;
		const EXCLUDE1 = `!${co.src}/${co.exclude}/`;
		const EXCLUDE2 = `!${co.src}/${co.vendors.src}/`;
		const DEST = `${co.temp}/${co.scripts.tempDirectory}/`;
		const TEMPTSFILE = co.scripts.tempTsScript;
		console.log(`Scripts building : [${SRC}] --> [${DEST}${TEMPTSFILE}], excluding [${EXCLUDE1}] and [${EXCLUDE2}]`);

		// imports
		const isTest = co.env.isTest;
		const plumbing = co.buildingSteps.plumbing; 

		return gulp.src( [SRC, EXCLUDE1, EXCLUDE2], { ignoreInitial: false })
			.pipe(					newer( DEST + TEMPTSFILE ))
			.pipe( _if( isTest, 	using({ prefix:'[scripts/TS] using :', color:'green', filesize:true })))
			.pipe( _if( plumbing,	plumber() ))
			
			// .pipe(					concat ( TEMPTSFILE ))
			.pipe( 					ts(	{noImplicitAny: true, out: TEMPTSFILE } ))

			.pipe( _if( plumbing,	plumber.stop() ))
			.pipe(					gulp.dest( DEST ))
			.pipe( _if( isTest,		using({ prefix:'[scripts/TS] done :', color:'green', filesize:true })));
	}
	return;
});

