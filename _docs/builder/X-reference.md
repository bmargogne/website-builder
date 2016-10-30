Use this list as reference while discovering / learning / using / completing this 
HTML / SCSS / JS framework. It helps keep an eye on where is what, and continuously
check if the structure makes sense or should evolve...

note : the * parameter indicates that parameters are similar to above mixin.

##### app.SCSS
loads all the scss partials in the right order : common & specific

#### style/bootstrap.scss
regroup all the common variables and mixin. Should be common to all your projects

- **general/reset** set default behaviour for html tags
- **general/globals** 'root' variables, which doesn't rely on any other.
- **general/media**  
	- responsive3( property, sizeS, sizeM, sizeL )     ....rely on screen-sizeL
- **colors/swatch** : associate variable names to color codes.
- **colors/scheme** : set color variable names + shades & states variants 
- **colors/effect** : common color effects
	- ::selection
	- linear-gradient( direction?, color-stops... )
-**colors/theme** : color /fill states & background mixin
	- theme( color, background)
	- themeN( * )
	- themeN-dark( * )
	- themeN-inv( * )
	- themeP( * )
	- themeP-dark( * )
	- themeP-inv( * )
	- themeS( * )
	- themeS-dark( * )
	- themeS-inv( * )
	- themeNP( * )
	- themeNS( * )
	- themePS( * )
	- themeS( * )
	
	- dynamic-theme( color, background, color-hover, background-hover,
					color-active, background-active, color-visited, background-visited, )
	- dynamic-themeN( * )
	- dynamic-themeN-inv( * )
	- dynamic-themeN-dark( * )
	- dynamic-themeP( * )
	- dynamic-themeP-inv( * )
	- dynamic-themeP-dark( * )
	- dynamic-themeNP( * )

- **boxes/layout** : box behaviour (flexbox) + body size & margin
	- flexbox( direction, wrap, justify-content )
	
	- flexbox-row( wrap, justify-content, direction )
	- flexbox-rowR( * )
	- flexbox-Col( * )
	- flexbox-ColR( * )

	- flexbox-wrap( direction, justify-content, wrap)
	- flexbox-nowrap( * )
	- flexbox-wrapR( * )

	- flexbox-spaceA( direction, wrap, justify-content )
	- flexbox-spaceB( * )
	- flexbox-center( * )
	- flexbox-start( * )
	- flexbox-end( * )
	
- **boxes/position** : placing a box compared to its natural position
	- positionTR( top, right, position )
	- positionTL( top, left, position )
	- positionBR( bottom, right, position )
	- positionBL( bottom, left, position )
	- positionT( top, position )
	- positionR( right, position )
	- positionB( bottom, position )
	- positionL( left, position )
	- (position( top, right, bottom, left, position ))

- **boxes/spacing** : padding & margin
	- padding( top, right, bottom, left )
	- padding-reset ( * )
	- paddingH ( left, right )
	- paddingH-reset ( * )
	- paddingV ( top, bottom )
	- paddingV-reset ( * )

	- margin( top, right, bottom, left )
	- margin-reset ( * )
	- marginH ( left, right )
	- marginH-reset ( * )
	- marginV ( top, bottom )
	- marginV-reset ( * )
	
	- spacing( top, right, bottom, left )
 	- spacing-reset( * )
	- spacingH( left, right )
	- spacingH-reset( * )
	- spacingV( top, bottom )
	- spacingV-reset( top, bottom )

- **boxes/size** : max/min width & heigth
	- size( width, height, forcemin, forcemax)

- **boxes/shape** : fancy stuff
	- circle-box( radius )
	- rounded-box( topleft, topright, bottomright, bottomleft )
	- rounded-boxL( bottomleft, topleft, topright, bottomright )
	- rounded-boxT( topleft, topright, bottomright, bottomleft )
	- rounded-boxR( topright, bottomright, bottomleft, topleft )
	- rounded-boxB( bottomright, bottomleft, topleft, topright )

- **boxes/effect** : make it all shiny
	- box-shadow( distance, blur, color, spread, ycoord)
	- bg-color( color )
	- borderH( border-size, color)
	- borderV( border-size, color)
	- test()

- **boxes/dynamic** : mouse interaction
	- dynamic-tranparency( color, end-opacitiy, start-opacitiy)
	- dynamic-gradient( colorA, colorB, end-opacity)
	- test-hover()
	- test-border( size, color, style)

- **images/background**
	- full-background( imageName, fixed, originV, originH )
	- full-responsive-background( * )
	- full-oriented-background( * )

- **images/decoration**
	- circular-image( size, imageName)
	- opacity( opacity ) 


- **images/animation**
	- circular-image( size, imageName)

- **texts/fonts**
	- txt( weight, decoration, style, case-style )
	- txt-upper( * )
	- txt-lower( * )
	- txt-cap( * )
	- txtB( decoration, style, case-style, weight )
	- txtU( weight, style, case-style, decoration )
	- txtI( weight, decoration, case-style, style )
	- txtBU( style, case-style, weight, decoration )
	
	- font( font, weight, decoration, style )
	- fontU( font, weight, style, decoration )
	- fontB( font, style, decoration, weight )
	- fontI( font, decoration, weight, style )

- **texts/effect**
	- txt-hover( hovercolor, text-decoration )