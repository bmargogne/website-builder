// npm packages
const gulp = require('gulp');
const requireDir = require('require-dir');
const runSequence = require('run-sequence');
const watch = require('gulp-watch');

// imports
const config = require('./_config.json');
const tasks = requireDir('./'); /// USEFUL ????

// globs
const CSS =  `${config.src}/${config.style.srcCss}/`;
const SCSS =  `${config.src}/${config.style.srcScss}/`;

// task
gulp.task('style', () => {
	return runSequence(
		[
			'styleCss',
			'styleScss'
		],
		'styleFinal'
	);
});

// watch
gulp.task('watch-style', () => {
	console.log('')

	return watch( [CSS, SCSS], (event) => {
		runSequence('style', 'liveReload');
	});
})