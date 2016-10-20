const gulp = require('gulp');
const fileinclude = require('gulp-file-include');
const newer = require('gulp-newer');
const using = require('gulp-using');
const watch = require('gulp-watch');

const config = require('./config.json');

gulp.task('pagesHtml', function () {

	const SRC = `${config.src}/${config.pages.src}`;
	const EXCLUDE1 = `!${config.src}/${config.pages.partials}`;
	const EXCLUDE2 = `!${config.src}/${config.vendors.src}`;
	const DEST = `${config.dest}/`;

	console.log(`Html Pages : ${SRC} --> ${DEST}`);

	return watch( [SRC, EXCLUDE1, EXCLUDE2], { ignoreInitial: false } )                           // exclude files which should be left untouched (eg external scripts) or partials
		.pipe( newer( DEST ))
		.pipe( using( {prefix:'[pages/html] using :', color:'cyan', filesize:true} ))     // list input stylesheet
		.pipe( fileinclude({                                                      // process file includes in SRC html (partials or variables allocation...)
			prefix: '@@',
			basepath: config.src
		}))
		.pipe( gulp.dest(DEST) );
});
