// npm packages
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const open = require('gulp-open')
const watch = require('gulp-watch');

// imports
const config = require('./_config.json');

// tasks
gulp.task('serveLocal', () => {

 	return browserSync.init({
		server:{
			baseDir : config.dest
		},
		port: 4000,
		open: false,
		ui: {
			port: 8000
		}
	});
});

// triggered by every watch task
gulp.task('liveReload', () => {
	browserSync.reload();
});

const using = require('gulp-using');

gulp.task('openBrowsers', () => {
	console.log('hhhhhhhhhhhhhh')

 	return gulp.src('')
	 	.pipe( using() )
		.pipe( open({uri: 'http://localhost:4000', app: 'firefox'}))
		// .pipe(open( {uri: 'http://localhost:4000'}, {app: 'safari'}))
		// .pipe(open( {uri: 'http://localhost:4000'}, {app: 'opera'}))
		.pipe(open( {uri: 'http://localhost:4000'}, {app: 'google-chrome'}));
});
