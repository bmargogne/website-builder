I am working on a website build tool (https://github.com/bmargogne/website-builder.git), and browserSync works perfectly while being on the root index.html, but not anywhere else.
to explain, let's say I have :

`src/index.html`
`src/_header.html`
`src/page/index2.Html`

One task builds HTML pages by including html partials (their names start with _ ) 

gulp.task('pagesHtml', () => {
	const SRC = 'src/**/*.html';
	const EXCLUDE = '!src/**/_*.html';
	return gulp.src( [SRC, EXCLUDE], { ignoreInitial: false } )
		pipe(	fileinclude({ prefix: '@@', basepath: co.src }))
		.pipe(	gulp.dest( 'www/' ));
});

One task builds the browser Sync server

gulp.task('serveLocal', () => {
	return browserSync.init({
		server:{ baseDir : 'www' },
		port: 3000,			
		open: true
	});	
});

One task is called to start a reload (it is used by different 'watchers')

gulp.task('liveReload', ()) => {
	browserSync.reload();
});

And one task watch all HTML (including partials) and should rebuild the whole page, then reload. 

gulp.task('watch-pagesHtml', () => {
	const SRC = 'src/**/*.html';		
	return watch( SRC, () => {
		runSequence('pagesHtml', 'liveReload');
	});
	return;
});
