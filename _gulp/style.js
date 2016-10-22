// npm packages
const _if = require('gulp-if');
const gulp = require('gulp');
const requireDir = require('require-dir');
const runSequence = require('run-sequence');
const watch = require('gulp-watch');

// imports
const co = require('./_config.json');
const processStyle = co.buildingSteps.processStyle;

// task
gulp.task('styleAndSpriteSheet', () => {
	if (processStyle) {
		return runSequence(
			[
				'imgSprite',
				'styleCss',
				'styleScss'
			],
			'styleFinal'
		);
	}
	return;
});

// watch
gulp.task('watch-styleAndSpriteSheet', () => {
	if (processStyle) {

		// globs
		const CSS =  `${co.src}/${co.style.srcCss}/`;
		const SCSS =  `${co.src}/${co.style.srcScss}/`;
		const SPRITEFILES = `${co.src}/${co.images.srcSprite}/` // generating a bitmap spritesheet also generates a definition CSS
		console.log(`Watching styles : [${CSS}], [${SCSS}] and [${SPRITEFILES}]`);

		return watch( [CSS, SCSS, SPRITEFILES], (event) => {
			runSequence('styleAndSpriteSheet', 'liveReload');
		});
	}
})