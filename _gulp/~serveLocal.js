// npm packages
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const watch = require('gulp-watch');

// imports
const config = require('./_config.json');

// task
gulp.task('serveLocal', () => {

 	return browserSync.init({
		server:{
			baseDir : config.dest
		},
		port: 4000,
		open: true
	});
});

// triggered by every watch task
gulp.task('liveReload', () => {
	browserSync.reload();
})