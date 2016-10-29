# Tasks
=======

### Pages

**glob src** : **/*.html
**exclude** : partials ( _*.html )
**destination**: keep the same folder structure as the source.

The Pages builder reads every HTML source files, and use them to build static HTML pages, easily read by robots from any search engines.
HTML files are either pages, either partials. By default partials' name start with an underscore (ex: _navBar.html).

Partials are typically used for reusable elements of a HTML page : header, footer, navBar ...
in order to include partials in a page, use following command in HTML :

			@@include('_components/subpath/to/partials/_partial.html')

You may pass variables from the page, to be used when generating the partial.

Ex:(in the HTML page )
`@@include('_components/header/_header-blank.html', {`
`	"title": "My awesome site - Homepage",`
`	"description": "This description will be visible in some particular situation"`
`})`

Ex:(in the HTML partial )
`<!DOCTYPE html>`
`<html xmlns:og="http://ogp.me/ns#">`
`<head lang="fr">`
    `<title>@@title</title>`
    `<meta property="og:description" content="@@description"/>`
`</head>`

_Note : bug known - when modifying a partial, no html pages using it will rebuild, hence no browser reload



### Files

**glob src**: **/files/\**/*.*
**goes to**: _assets/files, with flat tree structure.

Files placed in any subfolder called "files" will be copied to the _asset/files directory. Their folder structure is flattened,
so any download link as url in the form : href="_assets/files/fileName.xxx"
This allows to group download files together with their context (eg related pages, css,...)  in the src folder.
However, you should not use similar filenames when naming your files

### Fonts

**glob src**: **/*.{eot,otf,ttf,woff,woff2}
**goes to**: _assets/fonts, with flat tree structure.

Any file with a font extension will be gathered in the _asset/fonts directory, and can be called using
an url in the form : href="_assets/fonts/fontName.xxx"
This allows to group download files together with their context (eg related pages, css,...)  in the src folder.
However, you should not use similar filenames when naming your files


### Scripts

**glob src**: **/*.js
**goes to**: _assets/script.js
**note**: not including vendor scripts.

Explode your scripts in various files, stored together with their using context, typically the pages they are related to.
All script files will be concatenated in a single file, minified (with sourcemaps), and placed in the _assets/ directory.
You should typically call it inside your footer.

The generated script can be wrapped in a user defined string, for specific situations.
ex: wrap in `$(document).ready( () => { ** generated script file ** })`


### Styles

** incomplete **
I encourage to split your `scss` files in three levels of standard :
- **_assets/styles/bootstrap** : contains a common set of files used for all your projects.
The most stable / generic set possible, fully adapted to your own methods.
- **_assets/styles/styles** : contains a common set of files used for this project only.
This set should evolve a lot at first, when building key elements of the project, then it should not evolve anymore.
While the rules applied are specific to this project, a uniform naming convention applied to your project will create your work automatisms
- **_components** : contains all the html code, javascript code, and any filetype linked directly and only to this component  
- **pages** : basically the same kind of content than components, except that pages uses components directly (while components refer
to pages through naming conventions)





### SVG - Vector Sprites

**glob src**: **/*.svg
**goes to**: _assets/images/spriteSvg.svg
**note** : you can use the "svg4everybody" script in your header for compatibility with IE8

All found SVG files will be "cleaned and optimized" (removing some informations, rounding the precision) in order to generated
a SVG spritesheet. The following workflow is smooth and works for me :
- Work on illustrator. Your ai file(s) contains multiple artboards with explicit names (ex: `menu-dark`). One for each vector graphic you need.
- When finished, click on 'save under' -> 'name.svg' + 'use artboards'. This will export files named like `name_menu-dark.svg`.
- (On export options, choose 'SVG Tiny 1.2' profile, incorporate image position, vectorise fonts, rounding to 1 decimal, and tick 'reactive' option)
- The watcher will automatically detect new svg files and compile all source SVG into a SVG spritesheet.
- In HTML, you can know call your graphics using  `<svg class="myClass" title="myTitle" role="img"><use xlink:href="/myPath/spritesheet.svg#name_menu-dark"></use></svg>`
- In CSS, you can dynamically change the colors (using the `fill` property on `myClass`) and size of your SVG using CSS.
- (note that CSS coloring only work with shapes filled with the 'magic black' : #000000
- Note : you can target even more precise svg elements by naming layers, groups, and paths in AI, as they will create an id attribute in the SVG tag.


### Bitmap Images

**glob src**: **/*.{bmp,png,jpg}
**goes to**: _assets/images/, with a flat tree structure
**exclude** : files for bitmap spritesheet

Images placed anywhere in the filetree be copied to the _asset/images. Their folder structure is flattened,
so any reference to the image uses an url in the form : href="_assets/images/imgName.xxx"
This allows to group image files together with their usage context (eg related pages or components, css,...)  in the src folder.
However, you should not use similar filenames when naming your files



### Bitmap Sprites

### Styles

**glob CSS src**: **/*.css
**glob SCSS src**: **/*.scss
**goes to**: _assets/style.css
**note**: temporary files are volontarly stored in the _tmp folder

Styles are all concatenated into a single file. The final file is the reunion of three temporary files :
- all concatenated "standard" CSS
- all preprocess SCSS filles
- the generated definition CSS for the bitmap sprites.

Once concatenated, this superstylesheet is minified with sourcemaps. It should typically be reference in the header of the HTML pages.


### Vendors

**glob src**: _vendors/ **.*
**goes to**: _assets/vendors

Files place under the _vendor directory are simply copied, while keeping their filetree structure. This was though for any script (or else)
that need to be left untouched (ex: jquery, API for external services...)
Note that vendor files are never treated by other building tasks.


### Exclude
**glob src**: _vendors/ **.*
**goes to**: nowhere

Files placed under any "exclude" directory are ignored. Store here any file which would interfere with other building tasks (ex: temporary script tests)
