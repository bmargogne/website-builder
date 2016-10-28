# Bootstrap rules

Bootstrap rules define the most stable / reused style rules for your projects :
- standard variables : size, offset, length, screen size, font size, color schemes (primary/secondary, shades...), etc.
- mixin : default mixin will help A LOT to be quicker when building rules for more precise elements. bonus: they do no generate extra unused properties.


All bootstrap rules should be used as basic bricks for building your project styles (for component and pages...).
Ideally, you work on it on first moments of the project when defining the graphic chart and overall designs, and afterwards you do not modify it anymore.
(... or eventually to add up additional mixin! )  

Well used, these bootstrap rules will eventually evolve towards something very stable that you may reuse from projects to projects with very quick integration time. 



### improvement ideas

- create a clear map of dependencies, (ex: text depends on colors,, theme depends on color AND themes, etc..)
- create more intermediary global variable : ex: stdmargin, stdpadding, stdborderwidth ...



idea for shortcuting @include & @extend...
https://groups.google.com/forum/#!topic/sass-lang/f5HIvqGjLUI