const gulp = require('gulp');
const fileinclude = require('gulp-file-include');
const newer = require('gulp-newer');
const using = require('gulp-using');
const watch = require('gulp-watch');

const config = require('./_config.json');

gulp.task('pagesHtml', function () {

	const SRC = `${config.src}/${config.pages.src}`;
	const EXCLUDE1 = `!${config.src}/${config.pages.partials}`;
	const EXCLUDE2 = `!${config.src}/${config.vendors.src}`;
	const DEST = `${config.dest}/`;

	console.log(`Html Pages building : ${SRC} --> ${DEST}`);
	console.log(`Html Pages excludes : ${EXCLUDE1} and ${EXCLUDE2}`);

	return watch( [SRC, EXCLUDE1, EXCLUDE2], { ignoreInitial: false } )
		.pipe( newer( DEST ))
		.pipe( using( {prefix:'[pages/html] using :', color:'cyan', filesize:true} ))
		.pipe( fileinclude({
			prefix: '@@',
			basepath: config.src
		}))
		.pipe( gulp.dest( DEST ));
});
