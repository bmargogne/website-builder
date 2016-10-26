
// user can duplicate / remove elements with click. Typically used to test list containers
$(document).on('mousedown', '.test-dup li', event => {
	switch (event.which) {		
		case 1: 
			$( event.target ).clone().appendTo( '.test-dup');
			break;
		case 2:
			$( event.target ).remove();
			break;
	}
});