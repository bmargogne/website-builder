### Optimising the SASS mixin usage

When maquetting a website, the job partly consists in building basic blocks for a project : choosing layout, icons, navigation, colors, fonts...
When testing a new feature or design, the pixel perfect approach may not be prefered when compared to a quick iterative process allowing the regular testing
and refining approch. 

When coding, every line or characted not typed may be some time saved ... provided it does not prevent code clarity.
This documentation gives some tips to reach this goal by building a limited set of "Standard Units", and a powerful collection of mixin
- even for the most common properties definition when it make sense -.

Lets build your own package !


#### THE rule to remember

if typing a css property needs more text than '@include 12345678910', a mixin is worth considering.
Overtime, you will build (and maintain!) a set of mixin suited to your needs, and saving you tons of time.


#### Typical use case

##### when NOT to use a mixin

		width : 12%;
		@include width($stdu);			--> his is longer to write, even without parameters, so probably not a productive solution
		@include widthStd();			--> same
		@include width(12%);			--> same
		@include widthStd;				--> same

##### however :
		
		background-color : red;			--> this is longer to write than the three mixin below.
		@include bg(#FF0000);
		@include bg($red);
		@include redBg;					--> the most efficient option.


##### A detailed example of how/why writin mixin even for basic property will help you:

		box-shadow : 3px 3px 5px 2px black;		--> std css
		@include boxShadow(3, 3, 5, 2, black); 	--> yes, a fully filled mixin is longer to write... BUT :

		You can easily tweak your mixin to make it quicker to write, and works in 95% of the time :

		@include boxShadow(3, 5, 2, black);		--> when prototyping, x == y most of the time. the new mixin take one $distance parameter instead of $x and $y
		@include boxShadow(3, 5, black, 2);		--> if color has more priority than spread, its parameter should come first ..
		@include boxShadow(3, 5, black);		--> ... because if spread is now default, your call is now shorter than css, still being flexible enough	
		@include boxShadow(3, 5);				--> the default color will suit most of the time during test. 
		@include boxShadow;						--> Ultimately the default shadow - which should represent the most used one - is the default.



### in practice

In a usual workflow, you can now define phases in your design. For instance :

- phase one : only default values, near to no parameter given
- phase two : main parameters
- phase three : all parameters are set
- phase four : additionnal properties are added to overwrite wrong values made by the mixin

While you may need additional work at first to set a collection of stand units & mixin adapted to you workflow, you will
see you productivity increase over time in the project. 

Ideally, additional building tools will help you check which parameters are called the most, and suggest a set of defaults variables to
be (automatically!) applied, which should also reduce the code (default variable may not be needed, hence not written, hence shorter code...)

Ideally 2: Now that the code is full of @include or @extend everywhere, we want to replace them using another special character.
The € would be nice (time is money!), but I guess it is a hassly without a european keyboard :) 