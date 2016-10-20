// npm packages
const clean = require('gulp-clean');
const gulp = require('gulp');

// task
gulp.task('clean', () => {

	// imports
	const config = require('./_config.json')
	const cleanDest = config.buildingSteps.cleanDest;
	const cleanTemp = config.buildingSteps.cleanTemp;

	let globs = [];

	if (cleanDest) {
		const DEST = `${config.dest}`;
		console.log(`Cleaning folder : ${DEST}`);
		globs.push(DEST);
	}
	if (cleanTemp) {
		const TMP = `${config.temp}`;
		console.log(`Cleaning folder : ${TMP}`)
		globs.push(TMP)
	}

	return gulp.src( globs , {read: false})
		.pipe( clean() );
});
