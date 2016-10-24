# Documentation
===============

version : from the 2016-10-23
Documentation may not be up to date...

**Important :** All quoted globs and directory are thoses set by default. Various elements can be configured in the `config.json` file.


## How to use

### settings

All settings are done through the `config.json` file. If the possibilities are not enough for your need, adjust the source code to your needs !

### init

The entry point is in `gulpfile.js`. It calls the `_starter` task, which describes various building sequence. (ex: scripter, designer, tester... )

### tasks

Each building steps is described in its own JS file. The process is fairly similar in all of them :
- SRC files come in (described by the including / excluding globs)
- files are processed specifically depending on the performed task
- once finished, the resulting file(s) go(es) to the DEST folder

### environnement

Two working environnement are defined so far :
- **production** : set 'isProd' to true to activate. Includes additional building steps, reducing build performance, but generating more optimized files.
- **test** : set 'isTest' to true to activate. Generates additional output in the console, and allows a close follow up of the process : which files are used,
details for any error, double check on globs...


### building steps

Each single building step can be activated / deactivaed. Just turn the corresponding line to `true` or `false`.

ex:
- `"processFiles" : true`,
- `"processScripts": true`,
-    `"wrapScript": false`,

### browser

List the browsers which should be opened when building. One is enough for development (but not for testing). Many is good for testing, but not for development...
For windows user, please ensure the executable names are listed in your %PATH%.

### path, filenames, globs

For each specific task, you will typically find a SRC and a DEST glob.



## Tasks

### Pages

**glob src** : **/*.html
**exclude** : partials ( _*.html )
**destination**: keep the same folder structure as the source.

The Pages builder reads every HTML source files, and use them to build static HTML pages, easily read by robots from any search engines.
HTML files are either pages, either partials. By default partials' name start with an underscore (ex: _navBar.html).

Partials are typically used for reusable elements of a HTML page : header, footer, navBar ...
in order to include partials in a page, use following command in HTML :

			@@include('_partials/subpath/to/partials/_partial.html')

You may pass variables from the page, to be used when generating the partial.

Ex:(in the HTML page )
`@@include('_partials/header/_header.html', {`
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



### Vector Sprites

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


## F.A.Q

Some mistakes & solutions based on my own experience... Your feedbacks can complete this list !

### DOs and DONTs

- DON'T : work on files in the dest (www) directory, as they will be overwritten. work ONLY in the src

### Some of my building steps are not running ??
if a building sequence seems incomplete :
- check if the building step is activated in the config.json
- ensure the building step is referenced in the building sequence you are calling
- call just the single problematic task
- read the source code, as you may find some bugs

### What can I configure ?
- Building steps of the sequence can be (de)activated separately for testing purpose or targeted work
- All globs, path, and file names are stored in config.json. feel free to adapt it for your needs
- set 'isProd' environnement for additional building steps (ex: compressing images or minifying files & generating sourcemaps)
- set 'isTest' for a (very) verbose build tools, allowing you to understand what is going on.
- set 'es6' to force usage of babel transpilation (you write 'new' ES6 javascript, he converts to 'old' ES5 javascript)
- select which browser should be opened when running the local server. Great for testing purpose, ... but only when needed.
