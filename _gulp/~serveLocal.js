// npm packages
const gulp = require('gulp');							// http://gulpjs.com/
const _if = require('gulp-if');							// https://www.npmjs.com/package/gulp-if
const browserSync = require('browser-sync').create();	// https://www.browsersync.io/
const open = require('gulp-open');						// https://www.npmjs.com/package/gulp-open

// imports
const co = require('./_config.json');

// tasks
gulp.task('serveLocal', () => {

	const serveLocal = co.buildingSteps.serveLocal;
	const browserSyncUI = co.serve.browserSyncUI;
	let uiOptions; uiOptions = browserSyncUI ? { port:3001 } : uiOptions = false;
	let localPort = co.serve.localport;

	if (serveLocal) {
		return browserSync.init({
			server:{
				baseDir : co.dest
			},
			port: localPort,
			ui: uiOptions,
			open: true
		});
	}
	return;
});

// task
gulp.task('openBrowsers', () => {

	// imports
	const serveBrowsers = co.buildingSteps.serveBrowsers;

	if (serveBrowsers) {

		const localurl = co.serve.localurl;

		const chrome = co.serve.browsers.chrome;		
		const chromewin = co.serve.browsers.chromewin;
		const iexplore = co.serve.browsers.iexplore;
		const edge = co.serve.browsers.iexplore;
		const firefox = co.serve.browsers.firefox;
		const safari = co.serve.browsers.safari;
		const opera = co.serve.browsers.opera;
		console.log('Serving locally, opening multiple browsers');

		return gulp.src('')
			.pipe( _if( chrome,		open( {uri: localurl, app: 'google-chrome'} )))
			.pipe( _if( chromewin,	open( {uri: localurl, app: 'chrome'} )))
			.pipe( _if( iexplore,	open( {uri: localurl, app: 'iexplore'} )))
			.pipe( _if( edge,		open( {uri: localurl, app: 'MicrosoftEdge'} )))
			.pipe( _if( firefox,	open( {uri: localurl, app: 'firefox'} )))
			.pipe( _if( safari,		open( {uri: localurl, app: 'google-chrome'} )))
			.pipe( _if( opera,		open( {uri: localurl, app: 'opera'} )));
	}
	return;
});

// task triggered by every watch task
gulp.task('liveReload', () => {

	setTimeout(() => { 
		browserSync.reload();
	}, 500);

});