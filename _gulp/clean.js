// npm packages
const clean = require('gulp-clean');
const gulp = require('gulp');

// task
gulp.task('clean', () => {

	// imports
	const co = require('./_config.json')
	const cleanDest = co.buildingSteps.cleanDest;
	const cleanTemp = co.buildingSteps.cleanTemp;
	const cleanUndef = co.buildingSteps.cleanUndefined;

	let globs = [];

	if (cleanDest) {
		const DEST = `${co.dest}`;
		console.log(`Cleaning folder : ${DEST}`);

		globs.push(DEST);
	}
	if (cleanTemp) {
		const TMP = `${co.temp}`;
		console.log(`Cleaning folder : ${TMP}`);

		globs.push(TMP)
	}
	if (cleanUndef) {
		const UNDEF = 'undefined';
		console.log(`Cleaning folder : ${UNDEF}`);

		globs.push( UNDEF );
	}

	return gulp.src( globs , {read: false})
		.pipe( clean() );
});
