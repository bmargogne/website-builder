// npm packages
const _if = require('gulp-if');
const buffer = require('vinyl-buffer');
const gulp = require('gulp');
const merge = require('merge-stream');
const newer = require('gulp-newer');
const using = require('gulp-using');
const rename = require('gulp-rename');
const runSequence = require('run-sequence');
const spritesmith = require('gulp.spritesmith');
const imagemin = require('gulp-imagemin');
const watch = require('gulp-watch');

// imports
const co = require('./_config.json');
const processSprite = co.buildingSteps.processSprite

// task
gulp.task('imgSprite', () => {
	if (processSprite) {

		// globs
		const SRC = `${co.src}/${co.images.srcSprite}`;
		const EXCLUDE1 = `!${co.src}/${co.exclude}/`;
		const EXCLUDE2 = `!${co.src}/${co.vendors.src}/`;
		const DEST = `${co.dest}/${co.images.destSprite}/`;
		const DESTCSS = `${co.temp}/${co.images.tmpSubFolder}/`; // definition CSS will be concatenated with other SCSS & CSS
		const SPRITESHEET = co.images.bitmapSpritesheet;
		const CSSFILE = co.images.cssSpriteFile;
		console.log(`Bitmap Spritesheet : [${SRC}] --> [${DEST}${SPRITESHEET}] + [${DESTCSS}${CSSFILE}], excluding [${EXCLUDE1}] and [${EXCLUDE2}]`);

		// imports
		const isProd = co.env.isProd;
		const isTest = co.env.isTest;

		const spriteData = gulp.src( [SRC, EXCLUDE1, EXCLUDE2], { ignoreInitial: false })
			.pipe( _if( isProd, newer( DEST + SPRITESHEET )))
			.pipe( _if( isTest,
				using({
					prefix:'[images/sprite] including in spritesheet :',
					color:'magenta',
					filesize:true
				})
			))
			.pipe( spritesmith({
				// the generated stylesheet contains sprites' size and position on the spritesheet
				imgName: SPRITESHEET,
				cssName: CSSFILE,
			}));

		const imgStream = spriteData.img
			.pipe( buffer() )
			.pipe( _if( isProd, imagemin() ))
			.pipe( _if( isTest,
				using({
					prefix:'[images/sprite] spritesheet done :',
					color:'magenta',
					filesize:true
				})
			))
			.pipe( gulp.dest( DEST ));

		const cssStream = spriteData.css
			.pipe( _if( isTest,
				using( {prefix:'[images/sprite] spritesheet Css definition done :', color:'magenta', filesize:true} )))
			.pipe( gulp.dest( DESTCSS ));

		return merge(imgStream, cssStream);
	}
	return;
});

// watch
// the file watching is done together with "style"