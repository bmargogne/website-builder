const concat = require('gulp-continuous-concat');
const gulp = require('gulp');
const newer = require('gulp-newer');
const using = require('gulp-using');
const watch = require('gulp-watch');

const config = require('./_config.json');

// CSS files are concatenated and put in a temp directory
// the resulting CSS file will receive further treatment in the "stylesFinal" task.
gulp.task('stylesCss', () => {

	const SRC = `${config.src}/${config.styles.srcCss}`;
	const EXCLUDE = `!${config.src}/${config.vendors.src}/`;
	const DEST = `${config.temp}/${config.styles.destCss}/`;
	const STYLESHEET = config.styles.cssSheet;

	console.log(`Styles CSS building : ${SRC} --> ${DEST}${STYLESHEET}`);
	console.log(`Styles CSS excludes : ${EXCLUDE}`);

	return watch( [SRC, EXCLUDE], { ignoreInitial: false })
		.pipe( newer( DEST + STYLESHEET ))
		.pipe( using( {prefix:'[styles/css] concatenating :', color:'yellow', filesize:true} ))
		.pipe( concat( STYLESHEET ))
		.pipe( using( {prefix:'[styles/css] done :', color:'yellow', filesize:true} ))
		.pipe( gulp.dest( DEST ));
});
