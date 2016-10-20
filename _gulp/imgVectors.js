// const gulp = require('gulp');
// const using = require('gulp-using');
// const newer = require('gulp-newer');
// const rename = require('gulp-rename');
// const svgmin = require('gulp-svgmin');
// const svgSprite = require('gulp-svg-sprite');

// const config = require('./../gulp/config.json');

// gulp.task('vector', function () {

// 	const SRC = `${config.src}/${config.images.srcVectors}`;
// 	const EXCLUDE = `!${config.src}/${config.vendors.src}/`;
// 	const DEST = `${config.dest}/${config.images.srcVectors}/`;
// 	const SPRITESHEET = config.images.spritesheetFile;

// 	console.log(`Vector Spritesheet building : ${SRC} --> ${DEST}${SPRITESHEET}`);
// 	console.log(`Vector Spritesheet excludes : ${EXCLUDE}`);

// 	const configSvgo = {
// 		plugins: [                                                  // source SVG files are optimized before being sprited
// 			{cleanupAttris: false},
// 			{removeDoctype: false},
// 			{removeComments: true},
// 			{cleanupIDs: false},                                    // keeps ID to to allow CSS & JS targeting
// 			{removeViewBox: false},
// 			{cleanupNumericValues: {floatPrecision: 1}}             // precision is lessened to optimize file size
// 		]
// 	};


// 	const configSprite = {                                            // options for the sprite creation
// 		"transform": [],
// 		"svg": {
// 			"xmlDeclaration": true,
// 			"doctypeDeclaration": true,
// 			"dimensionAttributes": false,                           // dimensions are handled using CSS
// 			"namespaceIDs": false                                   // keeps ID to to allow CSS & JS targeting
// 		},
// 		"mode": {
// 			"symbol": {                                             // <symbol> allows the use of <svg> <use> </svg> in html, which allows dynamic manipulation
// 				"dest": ".",
// 				"sprite": FILE
// 			}
// 		}
// 	};


// 	return watch( [SRC, EXCLUDE], { ignoreInitial: false })
// 		.pipe( newer( DEST + SPRITESHEET ))
// 		.pipe( using( {prefix:'[images/vector] building spritesheet with :', color:'magenta', filesize:true} ))
// 		.pipe( rename( {dirname: ''} ))
// 		.pipe( svgmin( configSvgo ))
// 		.pipe( svgSprite( configSprite)).on('error', function (error) {
// 			console.error(error);                                       // SVG sprite is generated using options
// 		})
// 		.pipe( gulp.dest( DEST));
// });

	// const VECTORS = `${config.temp}/${config.style.destCss}/`;
    // gulp.watch( VECTORS, ['reload-vector']);
