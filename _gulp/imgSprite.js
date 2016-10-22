// npm packages
const _if = require('gulp-if');						// https://www.npmjs.com/package/gulp-if
const buffer = require('vinyl-buffer');				// https://www.npmjs.com/package/vinyl-buffer
const gulp = require('gulp');						// http://gulpjs.com/
const imagemin = require('gulp-imagemin');			// https://www.npmjs.com/package/gulp-imagemin
const merge = require('merge-stream');				// https://www.npmjs.com/package/merge-stream
const newer = require('gulp-newer');				// https://www.npmjs.com/package/gulp-newer
const rename = require('gulp-rename');				// https://www.npmjs.com/package/gulp-rename
const runSequence = require('run-sequence');		// https://www.npmjs.com/package/run-sequence
const spritesmith = require('gulp.spritesmith');	// https://www.npmjs.com/package/gulp.spritesmith
const using = require('gulp-using');				// https://www.npmjs.com/package/gulp-using
const watch = require('gulp-watch');				// https://www.npmjs.com/package/gulp-watch

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