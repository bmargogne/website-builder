// npm packages
const _if = require('gulp-if');
const gulp = require('gulp');
const using = require('gulp-using');
const newer = require('gulp-newer');
const rename = require('gulp-rename');
const runSequence = require('run-sequence');
const svgmin = require('gulp-svgmin');
const svgSprite = require('gulp-svg-sprite');
const watch = require('gulp-watch');

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
		const DEST = `${co.dest}/${co.images.destVectors}/`;
		const SPRITESHEET = co.images.vectorSpritesheet;
		console.log(`Vector Spritesheet : [${SRC}] --> [${DEST}${SPRITESHEET}], excluding [${EXCLUDE1}] and [${EXCLUDE2}]`);

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

		return gulp.src( [SRC, EXCLUDE1, EXCLUDE2], { ignoreInitial: false })
			.pipe(				newer( DEST + SPRITESHEET ))
			.pipe( _if(isTest,	using( {prefix:'[images/vector] building spritesheet with :', color:'magenta', filesize:true} )))
			.pipe(				rename( {dirname: ''} ))
			.pipe( _if(isProd,	svgmin( configSvgo )))
			.pipe(				svgSprite( configSprite )).on('error', error => { console.error(error); })
			.pipe( _if(isTest,	using( {prefix:'[images/vector] spritesheet done :', color:'magenta', filesize:true} )))
			.pipe(				gulp.dest( DEST));
	}
	return;
});

// watch
gulp.task('watch-imgVectors', () => {
	if (processVectors) {

		const SRC = `${co.src}/${co.images.srcVectors}`;
		const EXCLUDE1 = `!${co.src}/${co.exclude}/`;
		const EXCLUDE2 = `!${co.src}/${co.vendors.src}/`;
		console.log(`Watching Vector images : [${SRC}], except for [${EXCLUDE1}] and [${EXCLUDE2}]`);

		return watch( [SRC, EXCLUDE1, EXCLUDE2], () => {
			runSequence('imgVectors', 'liveReload');
		});
	}
	return;
});

