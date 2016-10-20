const gulp = require('gulp');
const newer = require('gulp-newer');
const rename = require('gulp-rename');
const using = require('gulp-using');
const watch = require('gulp-watch');

const config = require('./_config.json');

gulp.task('fonts', function () {

	const SRC = `${config.src}/${config.fonts.src}`;
	const EXCLUDE = `!${config.src}/${config.vendors.src}`;
	const DEST = `${config.dest}/${config.fonts.dest}/`;

	console.log(`Fonts simple copy : ${SRC} --> ${DEST}`);
	console.log(`Fonts copy excludes : ${EXCLUDE}`);

	return watch( [SRC, EXCLUDE], { ignoreInitial: false })
		.pipe( rename( {dirname: ''} ))
		.pipe( newer( DEST ))
		.pipe( using( {prefix:'[fonts] copying :', color:'gray', filesize:true} ))
		.pipe( gulp.dest( DEST ));
});

