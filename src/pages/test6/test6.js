

// user can duplicate / remove elements with click. Typically used to test list containers
$(document).on('click', '.test6-start', () => {
	
	for (let i = 0; i < 15; i++) {
		const newblock = `<li> No.${i}</li>`;
		$('.test6-blocks').append( newblock );
	}
}); 

