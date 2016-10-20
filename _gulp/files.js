const gulp = require('gulp');
const newer = require('gulp-newer');
const rename = require('gulp-rename');
const using = require('gulp-using');
const watch = require('gulp-watch');

const config = require('./_config.json');

gulp.task('files', function () {

	const SRC = `${config.src}/${config.files.src}`;
	const EXCLUDE = `!${config.src}/${config.vendors.src}`;
	const DEST = `${config.dest}/${config.files.dest}/`;

	console.log(`Files simple copy: ${SRC} --> ${DEST}`);
	console.log(`Files copy excludes : ${EXCLUDE}`);

	return watch( [SRC, EXCLUDE], { ignoreInitial: false })
		.pipe( rename( path => { path.dirname = ''}))
		.pipe( newer( DEST ))
		.pipe( using( {prefix:'[files] using :', color:'blue', filesize:true} ))
		.pipe( gulp.dest( DEST ));
});
