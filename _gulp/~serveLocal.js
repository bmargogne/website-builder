// npm packages
const gulp = require('gulp');							// http://gulpjs.com/
const _if = require('gulp-if')							// https://www.npmjs.com/package/gulp-if
const browserSync = require('browser-sync').create();	// https://www.browsersync.io/
const open = require('gulp-open')						// https://www.npmjs.com/package/gulp-open
const watch = require('gulp-watch');					// https://www.npmjs.com/package/gulp-watch

// imports
const config = require('./_config.json');

// tasks
gulp.task('serveLocal', () => {

	const serveLocal = config.buildingSteps.serveLocal;
	const browserSyncUI = config.buildingSteps.browserSyncUI;
	let uiOptions; uiOptions = browserSyncUI ? { port:3001 } : uiOptions = false;

	if (serveLocal) {
		return browserSync.init({
			server:{
				baseDir : config.dest
			},
			port: 3000,
			ui: uiOptions,
			open: false
		});
	}
	return;
});

// task
gulp.task('openBrowsers', () => {

	// imports
	const serveBrowsers = config.buildingSteps.serveBrowsers;

	if (serveBrowsers) {

		console.log('Opening multiple browsers')
		const firefox = config.browsers.firefox;
		const chrome = config.browsers.chrome;

		return gulp.src('')
			.pipe( _if( firefox,	open( {uri: 'http://localhost:3000', app: 'firefox'} )))
			.pipe( _if( chrome,		open( {uri: 'http://localhost:3000', app: 'google-chrome'} )));
	}
	return;
});

// task triggered by every watch task
gulp.task('liveReload', () => {

	setTimeout(() => { browserSync.reload(); }, 1000);

});