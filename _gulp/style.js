// npm packages
const _if = require('gulp-if');
const gulp = require('gulp');
const requireDir = require('require-dir');
const runSequence = require('run-sequence');
const watch = require('gulp-watch');

// imports
const config = require('./_config.json');
const processStyle = config.buildingSteps.processStyle;

// task
gulp.task('style', () => {
	if (processStyle) {
		return runSequence(
			[
				'styleCss',
				'styleScss'
			],
			'styleFinal'
		);
	}
	return;
});

// watch
gulp.task('watch-style', () => {
	if (processStyle) {

		// globs
		const CSS =  `${config.src}/${config.style.srcCss}/`;
		const SCSS =  `${config.src}/${config.style.srcScss}/`;

		console.log(`Watching styles : ${CSS} and ${SCSS}`);

		return watch( [CSS, SCSS], (event) => {
			runSequence('style', 'liveReload');
		});
	}
})