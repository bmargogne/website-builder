const argv = require('yargs').argv;								// https://www.npmjs.com/package/yargs
const gulp = require('gulp');
const requireDir = require('require-dir');
const runSequence = require('run-sequence');

const tasks = requireDir('./'); // eslint-disable-line

gulp.task('_starter', () => {

	if (argv) {
		console.log (`started with option --s ${argv.s}`);

		if (argv.local) {
			console.log('[Website Builder] Running : Local Server sequence');
			startLocalServer();
		}

		else if (argv.git === 'git') {
			console.log('[Website Builder] should initiate or commit & push to remote - not implemented yet. Any hint/suggestion is welcome');
		}

		else if (argv.ftp === 'ftp') {
			console.log('[Website Builder] should upload necessary files to ftp and delete unnecessary files from ftp. Any hint/suggestion is welcome');
		}

		else if (argv.test === 'test') {
			console.log('[Website Builder] Running : Test sequence');
			testSequence();
		}

		else {
			console.log('[Website Builder] Running : Quick Build sequence');
			defaultSequence();
		}
	}
	else {
		console.log( `[Website Builder] no options entered : Running Quick build.`);
		console.log( `*** run 'gulp --s local' for full clean + building + serving multiple local browsers`);
		console.log( `*** run 'gulp --s git' for initiating repo and/or commit + push to remote`);
		console.log( `*** run 'gulp --s ftp' for ftp upload to configured server`);
		console.log( `*** run 'gulp --s test' for testing sequence`);
		defaultSequence();
	}
});

const testSequence = () => {
	return runSequence(
		'clean',
		[
			'styleAndSpriteSheet',
		]
	);
};

const defaultSequence = () => {
	startLocalServer();
};

const startLocalServer = () => {
	return runSequence(
		'clean',
		[
			'pagesHtml',
			'imgBitmaps',
			'imgVectors',
			'files',
			'fonts',
			'scripts',
			'styleAndSpriteSheet',
			'vendors'
		],
		[
			'openBrowsers',
			'serveLocal',
			'watch-files',
			'watch-imgBitmaps',
			'watch-imgVectors',
			'watch-pagesHtml',
			'watch-scripts',
			'watch-styleAndSpriteSheet',
			'watch-vendors'
		]
	);
};
