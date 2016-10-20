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
const config = require('./_config.json');
const processVectors = config.buildingSteps.processVectors;


// task
gulp.task('imgVectors', function () {
	if (processVectors) {

		// globs & variables
		const SRC = `${config.src}/${config.images.srcVectors}`;
		const EXCLUDE = `!${config.src}/${config.vendors.src}/`;
		const DEST = `${config.dest}/${config.images.destVectors}/`;
		const SPRITESHEET = config.images.spritesheetVector;

		console.log(`Vector Spritesheet building : ${SRC} --> ${DEST}${SPRITESHEET}, excluding ${EXCLUDE}`);

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

		const isTest = config.env.isTest;
		const isProd = config.env.isProd;

		return gulp.src( [SRC, EXCLUDE], { ignoreInitial: false })
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

		const SRC = `${config.src}/${config.images.srcVectors}`;
		const EXCLUDE = `!${config.src}/${config.vendors.src}/`;

		console.log(`Watching Vector images : ${SRC}, except for ${EXCLUDE}`);

		return watch( [SRC, EXCLUDE], () => {
			runSequence('imgVectors', 'liveReload');
		});
	}
	return;
});

