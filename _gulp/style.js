// npm packages
const _if = require('gulp-if');						// https://www.npmjs.com/package/gulp-if
const gulp = require('gulp');						// http://gulpjs.com/
const requireDir = require('require-dir');			// https://www.npmjs.com/package/require-dir
const runSequence = require('run-sequence');		// https://www.npmjs.com/package/run-sequence
const watch = require('gulp-watch');				// https://www.npmjs.com/package/gulp-watch

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