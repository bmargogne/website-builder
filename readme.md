# Website builder
================

by Bertrand Margogne.


## Overview

website-builder is a tool for automating various operations during a website building.
It aims at easing the life of the web designer / integrator.

Basically, it automates usual operations / optimization that may be required on typical website elements : pages, scripts, styles, spritesheets.
It also work well together with external tools such as illustrator and photoshop.
In practice you save a lot of reloading time,thus making your production process a lot smoother.

It was developped for working alone in a simple front-end project (using 'only' HTML, CSS & JS), and may not be adapted for bigger projects or teams. 
Though nothing was tested so far, it probably isn't compatible with other more complex frameworks.

I do welcome remarks, suggestions ...and (constructive) critics !


## Get Started

### 1. install and run

You need node & npm installed. (...not sure which version, any feedback is appreciated). Then, in any command shell, type:

- `git clone https://github.com/bmargogne/website-builder.git`
- `cd website-builder`
- `npm install`
- `gulp`

This starts the builder, and open a web browser on the welcome page.
Open your favorite editor, and you are ready to play around : just edit anything from the `src` directory, and observe the builder rerun
and the web browser reloading, with any of your modification applied...

Start from there and build your site !

### 2. learn the rules on directories

This website builder comes with a few rules implied by its mechanics. In short :

- the `_docs` directory holds more in depth tips & tricks about this builder. Going through it diagonnally might never be useless
- the `_gulp` directory holds all the builder mechanics. If you want/need to understand and the builder to your needs, open `_config.json` and `_starter.js`.
- the `src` directory is where you work. Just write "standard" HTML / CSS / JS, or use some other  tools (partials, SASS...)  

once your run the builder, it generates : 
- the `www` directory is where your generated website is, built from your source. To have it available on the internet, it should be uploaded to a FTP 
- `_temp` : contains some files like intermediary stylesheet, and are useful for debugging. _Run `gulp clean` to get rid of them_
- `node_modules` : the npm packages needed to run the builder. There are a whole bunch of them, and there is no normal need for you to dig into this anyway. 


### 3. learn the rules on files

- `html` : html files ( `*.html` ) can be placed anywhere in the `src` folder. They will build and end up in the `www` directory.
	You can use partials (`_*.html` files) for reusable elements such as navbar or header (use @@fileinclude).

- `js` : javascripts ( `*.js` ) can be placed anywhere in the `src` folder. All javascript will compile into a single `script.js`, in the`www/_assets/` directory  
- `css` & `scss` : (preprocessed) stylesheet can be placed anywhere in the `src` folder. They will all compile down to a single `style.css`, in the`www/_assets/` directory
- `svg` : vector graphics can be placed anywhere in the `src` folder. They will all be compiled to to a single `s.svg` stylesheet, used with with every SVG tag from HTML files
- `woff, woff2, eot, ttf, svg` : fonts can be placed anywhere inside a folder named `font`. Fonts are copied and accessible using `www/_assets/fonts` (the subpath is not kept).
- `jpg, png, gif` : images can be placed anywhere in the `src` folder. They will be optimized, copied, and accessible using `www/_assets/images/imageName` (the subpath is not kept).
- `**/sprite` : images placed anywhere inside a folder named `sprite` will be compiled to a single spritesheet, so as the css selectors used to access it.
- `**/files` : anything under a folder named `files` will be copied and accessed using `www/_assets/fileName` (the subpath is not kept).  
- `_files` : anything under the `_vendor` folder will be copied to `_assets/vendors` and keep the file structure.


### 4. Tweak it to your needs

The source code tries to be as clear / segmented as possible, so with a bit of work you should be able to play with it and adjust it to your needs. 
... it has still a lot of room for improvement, so feel free to submit your participation!  
By the way : path & names used in the documentation can be changed in the configuration file.


## Features completed

#### Building steps
- **files, fonts & vendor scripts**: raw copy for all files from source the `www/_assets` directory
- **pages**: building html using partials
- **styles**: Sass preprocessors, minifying, sourcemaps, compatibility prefixes + a set of bootstrap style rules
- **images**: bitmaps compression, vector optimized spritesheet, bitmap optimized spritesheet
- **scripts**: concatenation, minifying, code wrapping, using plumber

#### Other
- **easy config**: paths & operations, building sequences
- **'light' on CPU**: applying scripts only on needed files
- **browserify** : test your website locally, on multiple browsers & devices simultaneously (desktops, tablets, smartphones)
- **livereload** : any change is automatically saved, and browser is refreshed


## Work in Progress

### known Issues
- Watchers are not perfect : they may miss newly created folders and their content. You may need to stop and reload the builder.
- Also, in some cases two reloads seems to be needed for a proper update.
- The test output may be confusing, as the file path display is wrong. This is necessary to keep the 'gulp-newer' check working.
- Changing a HTML partial will not rebuild the "caller" file, unless the "newer" package is deactivated on this task.



### Improvments ideas

#### version 0.3
- should write gulp scripts for audio & video
- should clean generated CSS pages of unused selectors with gulp uncss (beware of dynamically generated selectors...)

#### version 0.4
- should handle FTP deployment : automatic upload new files to FTP, delete unused files. 

#### version 0.5
- should handle server scripting (ex: using globs such as `**/server/**/*.*`)
- should handle PHP pages (both server and client)

#### version ...who knows ??

It mostly depends on personal needs and spare time !

- should solve known issues (any hint / help is welcome!)
- should be able to be compatible with some external frameworks (Ember, Meteor...)
- should accept typescript
- should be able to keep subfolder structure when copying elements
		(eg: from `**/{name}/**/*.*` to `{name}/**/*.*` rather than from `**/{name}/**/*.*` to `{name}/*.*`)  
- should be able to have a set of specific files (script & style) dedicated to a quick load of the landing page (up to the 'floating point') 
- should integrate git common tasks : creating/initiating repo, commit & push to remote
- should improve scss watching to reduce test verbosity ( _why can't I exclude the partials?_ )
- should write a task for bitmap image resizing (ex: for optimzed webresponsive background)
- should keep a copy of all exploded collection (`**/{name}/**/*.*`) in the temp directory (... and use it as a reference list²)
- should improve variable declarations in gulp to have a dryer code 

- more comprehensive / compact documentation
- should create a tool to help the creation & display of customized doc reading lists