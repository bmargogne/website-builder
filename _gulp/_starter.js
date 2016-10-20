const argv = require('yargs').argv;
const gulp = require('gulp');
const requireDir = require('require-dir');
const runSequence = require('run-sequence');

const config = require('./_config.json');
const tasks = requireDir('./');

gulp.task('_starter', () => {



	if (argv) {
		if (argv.type === 'local') {
			console.log('[Website Builder] Running : Local Server sequence');
			startLocalServer();
		}

		else if (argv.git) {
			console.log('[Website Builder] should initiate or commit & push to remote - not implemented yet. Any hint/suggestion is welcome');
		}

		else if (argv.ftp) {
			console.log('[Website Builder] should upload necessary files to ftp and delete unnecessary files from ftp. Any hint/suggestion is welcome')
		}

		else {
			console.log('[Website Builder] Running : Quick Build sequence')
			defaultSequence();
		}
	}
	else {
		console.log( `[Website Builder] no options entered : Running Quick build.`);
		console.log( `*** run 'gulp -local' for full clean + building + serving multiple local browsers`);
		console.log( `*** run 'gulp -git' for initiating repo and/or commit + push to remote`);
		console.log( `*** run 'gulp -ftp' for ftp upload to configured server`);
		defaultSequence();
	}
});

const defaultSequence = () => {
	return runSequence(
		[
			'files',
			'fonts',
			'imgBitmaps',
			'pagesHtml',
			'scripts',
			'style',
			'vendors',
		],
		[
			'serveLocal',
			'watch-files',
			'watch-imgBitmaps',
			'watch-pagesHtml',
			'watch-scripts',
			'watch-style',
			'watch-vendors',
			'openBrowsers'
		]
	);
}

const startLocalServer = () => {
	return runSequence(
		'clean',
		[
			'pagesHtml',
			'imgBitmaps',
			'files',
			'fonts',
			'scripts',
			'style',
			'vendors'
		],
		[
			'openBrowsers',
			'serveLocal',
			'watch-files',
			'watch-imgBitmaps',
			'watch-pagesHtml',
			'watch-scripts',
			'watch-style',
			'watch-vendors'
		]
	);
}