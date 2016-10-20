const argv = require('yargs').argv;
const gulp = require('gulp');
const requireDir = require('require-dir');
const runSequence = require('run-sequence');

const config = require('./_config.json');
const tasks = requireDir('./');

gulp.task('_starter', () => {

	if (argv.profile) {
		switch(argv.profile) {
			case "full": fullSequence(); break;
			default:
			console.log( "No valid profile chosen" );
			defaultSequence();
		}
	}
	else {
		console.log( "running default profile. Use --profile (WIP: full, TODO: scripter, webdesigner, deployer)" );
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
			'watch-vendors'
		]
	);
}

const fullSequence = () => {
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