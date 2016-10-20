const concat = require('gulp-continuous-concat');
const gulp = require('gulp');
const newer = require('gulp-newer');
const using = require('gulp-using');
const watch = require('gulp-watch');

const config = require('./_config.json');

gulp.task('scripts', () => {

	const SRC = `${config.src}/${config.scripts.src}`;
	const EXCLUDE = `!${config.src}/${config.vendors.src}/`;
	const DEST = `${config.dest}/${config.scripts.dest}/`;
	const SCRIPTFILE = config.scripts.scriptfile;

	console.log(`Scripts building : ${SRC} --> ${DEST}${SCRIPTFILE}`);
	console.log(`Scripts excludes : ${EXCLUDE}`);

	return watch( [SRC, EXCLUDE], { ignoreInitial: false })
		.pipe( newer( DEST + SCRIPTFILE ))
		.pipe( using( {prefix:'[scripts] concatenating :', color:'green', filesize:true} ))
		.pipe( concat ( SCRIPTFILE ))
		.pipe( using( {prefix:'[scripts] done :', color:'green', filesize:true} ))
		.pipe( gulp.dest( DEST ));
});
