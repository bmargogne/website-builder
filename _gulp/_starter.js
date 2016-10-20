const argv = require('yargs').argv;
const exec = require('gulp-exec');
const gulp = require('gulp');
const requireDir = require('require-dir');
const runSequence = require('run-sequence');

const config = require('../config.json');
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
	return runSequence([
		'files',
		'fonts',
		'scripts',
		'stylesCss',
		'stylesScss',
		'stylesFinal',
		'vendors',
		'buildHtml'
	]);
}

const fullSequence = () => {
	return runSequence(
		'clean',
		[
			'files',
			'fonts',
			'scripts',
			'stylesCss',
			'stylesScss',
			'stylesFinal',
			'vendors',
			'buildHtml'
		]
	);
}