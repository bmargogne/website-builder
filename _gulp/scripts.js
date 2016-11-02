// npm packages
const gulp = require('gulp');						// http://gulpjs.com/
const runSequence = require('run-sequence');		// https://www.npmjs.com/package/run-sequence
const watch = require('gulp-watch');				// https://www.npmjs.com/package/gulp-watch

// imports
const co = require('./_config.json');
const processScripts = co.buildingSteps.processScripts;

// task
gulp.task('scripts', () => {
	if (processScripts) {
		return runSequence(
			[
				'scriptsJS',
				'scriptsTS',
				// 'scriptsPHP' // not implemented so far
			],
			'scriptsFinal'
		);
	}
	return;
});

// watch
gulp.task('watch-scripts', () => {
	if (processScripts) {

		// globs
		const JS =  `${co.src}/${co.scripts.srcJs}/`;
		const TS =  `${co.src}/${co.scripts.srcTs}/`;
		// const PHP = `${co.src}/${co.style.srcScss}/`;
		
		const EXCLUDE1 = `!${co.src}/${co.exclude}/`;
		const EXCLUDE2 = `!${co.src}/${co.vendors.src}/`;

		console.log(`Watching scripts : [${JS}] and [${TS}], except for [${EXCLUDE1}] and [${EXCLUDE2}]`);

		return watch( [JS, TS, EXCLUDE1, EXCLUDE2], () => {
			runSequence('scripts', 'liveReload');
		});
	}
	return;
});
