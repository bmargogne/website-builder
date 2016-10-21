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
const config = require('./_config.json');
const processSprite = config.buildingSteps.processSprite

gulp.task('imgSprite', () => {
	if (processSprite) {

		// globs
		const SRC = `${config.src}/${config.images.srcSprite}`;
		const EXCLUDE = `!${config.src}/${config.vendors.src}/`;
		const DEST = `${config.dest}/${config.images.destSprite}/`;
		const DESTCSS = `${config.temp}/${config.images.tmpSubFolder}/`; // definition CSS will be concatenated with other SCSS & CSS
		const SPRITESHEET = config.images.bitmapSpritesheet;
		const CSSFILE = config.images.cssSpriteFile;
		console.log(`Bitmap Spritesheet : [${SRC}] --> [${DEST}${SPRITESHEET}] + [${DESTCSS}${CSSFILE}], excluding [${EXCLUDE}]`);

		// imports
		const isProd = config.env.isProd;
		const isTest = config.env.isTest;

		const spriteData = gulp.src( [SRC, EXCLUDE], { ignoreInitial: false })
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

