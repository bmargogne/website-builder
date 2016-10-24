const argv = require('yargs').argv;								// https://www.npmjs.com/package/yargs
const gulp = require('gulp');
const requireDir = require('require-dir');
const runSequence = require('run-sequence');

const tasks = requireDir('./'); // eslint-disable-line

gulp.task('_starter', () => {

	if (argv.local) {
		console.log('[Website Builder] Running : Local Server sequence');
		startLocalServer();
	}

	else if (argv.git) {
		console.log('[Website Builder] should initiate or commit & push to remote - not implemented yet. Any hint/suggestion is welcome');
	}

	else if (argv.ftp) {
		console.log('[Website Builder] should upload necessary files to ftp and delete unnecessary files from ftp. Any hint/suggestion is welcome');
	}

	else if (argv.test) {
		console.log('[Website Builder] Running : Test sequence');
		testSequence();
	}

	else {
		console.log( `[Website Builder] no options entered : Running Default build sequence.`);
		console.log( `*** run 'gulp --local' for full clean + building + serving multiple local browsers`);
		console.log( `*** run 'gulp --git' for initiating repo and/or commit + push to remote`);
		console.log( `*** run 'gulp --ftp' for ftp upload to configured server`);
		console.log( `*** run 'gulp --test' for testing sequence`);
		defaultSequence();			
	}

});

const testSequence = () => {
	return runSequence(
		'clean',
		[
			'style',
		],
		'watch-style'
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
			'style',
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
			'watch-style',
			'watch-vendors'
		]
	);
};
