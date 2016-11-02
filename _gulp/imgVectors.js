// npm packages
const _if = require('gulp-if');						// https://www.npmjs.com/package/gulp-if
const gulp = require('gulp');						// http://gulpjs.com/
const using = require('gulp-using');				// https://www.npmjs.com/package/gulp-using
const newer = require('gulp-newer');				// https://www.npmjs.com/package/gulp-newer
const rename = require('gulp-rename');				// https://www.npmjs.com/package/gulp-rename
const runSequence = require('run-sequence');		// https://www.npmjs.com/package/run-sequence
const svgmin = require('gulp-svgmin');				// https://www.npmjs.com/package/gulp-svgmin
const svgSprite = require('gulp-svg-sprite');		// https://www.npmjs.com/package/gulp-svg-sprite
const watch = require('gulp-watch');				// https://www.npmjs.com/package/gulp-watch

// imports
const co = require('./_config.json');
const processVectors = co.buildingSteps.processVectors;


// task
gulp.task('imgVectors', function () {
	if (processVectors) {

		// globs & variables
		const SRC = `${co.src}/${co.images.srcVectors}`;
		const EXCLUDE1 = `!${co.src}/${co.exclude}/`;
		const EXCLUDE2 = `!${co.src}/${co.vendors.src}/`;
		const EXCLUDE3 = `!${co.src}/${co.fonts.src}/`;
		const DEST = `${co.dest}/${co.images.destVectors}/`;
		const SPRITESHEET = co.images.vectorSpritesheet;
		console.log(`Vector Spritesheet : [${SRC}] --> [${DEST}${SPRITESHEET}], excluding [${EXCLUDE1}], [${EXCLUDE2}] and [${EXCLUDE3}]`);

		// SVG optimization parameters
		const configSvgo = {
			plugins: [
				{cleanupAttris: false},
				{removeDoctype: false},
				{removeComments: true},
				{cleanupIDs: false},						// ID allows CSS & JS targeting
				{removeViewBox: false},
				{cleanupNumericValues: {floatPrecision: 1}}
			]
		};

		// Sprite creation parameters
		const configSprite = {
			transform: [],
			svg: {
				xmlDeclaration: true,
				doctypeDeclaration: true,
				dimensionAttributes: false,					// dimensions are handled using CSS
				namespaceIDs: false							// ID allows CSS & JS targeting
			},
			mode: {
				// using <symbol> allow to use '<svg> <use> </svg>' in html
				// this allows dynamic manipulation
				symbol: {
					dest: ".",
					sprite: SPRITESHEET
				}
			}
		};

		const isTest = co.env.isTest;
		const isProd = co.env.isProd;

		return gulp.src( [SRC, EXCLUDE1, EXCLUDE2, EXCLUDE3], { ignoreInitial: false })
			.pipe(				newer( DEST + SPRITESHEET ))
			.pipe( _if(isTest,	using( {prefix:'[images/vector] building spritesheet with :', color:'magenta', filesize:true} )))
			.pipe(				rename( {dirname: ''} ))
			.pipe( _if(isProd,	svgmin( configSvgo )))
			.pipe(				svgSprite( configSprite )).on('error', error => { console.error(error); })
			.pipe(				gulp.dest( DEST))
			.pipe( _if(isTest,	using( {prefix:'[images/vector] spritesheet done :', color:'magenta', filesize:true} )));
	}
	return;
});

// watch
gulp.task('watch-imgVectors', () => {
	if (processVectors) {

		const SRC = `${co.src}/${co.images.srcVectors}`;
		const EXCLUDE1 = `!${co.src}/${co.exclude}/`;
		const EXCLUDE2 = `!${co.src}/${co.vendors.src}/`;
		const EXCLUDE3 = `!${co.src}/${co.fonts.src}/`;
		console.log(`Watching Vector images : [${SRC}], except for [${EXCLUDE1}], [${EXCLUDE2}] and [${EXCLUDE3}]`);

		return watch( [SRC, EXCLUDE1, EXCLUDE2, EXCLUDE3], () => {
			runSequence('imgVectors', 'liveReload');
		});
	}
	return;
});

