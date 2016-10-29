# Website builder
================

by Bertrand Margogne.


## Overview

website-builder is a tool for automating various operations during a website building.
It aims at easing the life of the web designer / integrator.

Basically, it automates usual operations / optimization that may be required on typical website elements : pages, scripts, styles, spritesheets.
It also work well together with external tools such as illustrator and photoshop.

**In practice you save a lot of reloading**, thus making your production process a lot smoother. _(your F5 key will thank you!)_

It was developped for working alone in a simple front-end project (using 'only' HTML, CSS & JS), and may not be adapted for bigger projects or teams. 
Though nothing was tested so far, it probably isn't compatible with other more complex frameworks. I do welcome remarks, suggestions ...and (constructive) critics !

_note: the builder is still under development & tests, so please do not expect a "finished" product_  


## Features

#### Building steps
- **files, fonts & vendor scripts**: raw copy for all files from source to the `www/_assets` directory
- **pages**: building html using partials, using plumber
- **styles**: Sass preprocessors, minifying, sourcemaps, compatibility prefixes + a set of bootstrap style rules & mixin
- **images**: bitmaps compression, vector optimized spritesheet, bitmap optimized spritesheet
- **scripts**: concatenation, minifying, code wrapping, using plumber

#### Other
- **central configuration**: 2 files (_config.json + _starter.js) will suffice to adjust paths, filenames, operations, and building sequences
- **'light' on CPU**: tasks are run only when needed (prevent reworking ALL files everytime)
- **browserify** : test your website locally, on multiple browsers & devices simultaneously (desktops, tablets, smartphones)
- **livereload** : any change is automatically saved, and browser is refreshed






## Get Started

### 1. install and run

You need node & npm installed. (...not sure which version, any feedback is appreciated). Then, in your command shell, type:

- `git clone https://github.com/bmargogne/website-builder.git`
- `cd website-builder`
- `npm install`
- `gulp`

This starts the builder, and open a web browser on the welcome page.
Open your favorite editor, and you are ready to play around : just edit anything from the `src` directory, and observe the builder rerun
and the web browser reloading, with your modifications applied... **Start from there and build your site !**

The builder source code tries to be as clear / segmented as possible, so with a bit of work you should be able to play with it and adjust it to your needs. 
... it has still a lot of room for debugging & improvement, so feel free to submit your participation :)
  

### 2. learn the rules on directories

This website builder comes with a few rules implied by its mechanics. In short :

- **`_docs`**: contains more in depth explanation & tricks about this builder. Have a (diagonnal) read sometimes !
- **`_gulp`**: holds all the builder mechanics & config. Starting tweaking it using `_config.json` and `_starter.js`.
- **`src`**: this is where you work and store files for your website: pages, styles, images, scripts, files...

when `gulp` is ran, it generates : 
- **`www`**: holds your generated website is, built from `src`. Upload it to a FTP when your website is ready !
- **`_temp`** : these 'intermediary' generated files (like stylesheet) may be useful for debugging. _Run `gulp clean` to get rid of them_
- **`node_modules`** : the npm packages needed to run the builder. There are a whole bunch of them, and there is no normal need for you to dig into this anyway. 


### 3. learn the rules on files

- **pages** ( `*.html` ) : place them anywhere in the `src` folder. They will build and end up in the `www` directory.
	Use partials (`_*.html` files) for reusable elements such as navbar or header (use @@fileinclude).

- **scripts** ( `*.js` ) : place them anywhere in the `src` folder. All `js` files will compile to a single `www/_assets/script.js`.
- **styles** (`*.css`, `*.scss`) : place them anywhere in the `src` folder. They will compile to a single `www/_assets/style.css`.
- **vectors** (`*.svg`) : place them anywhere in the `src` folder. They will be compile to a single sprite sheet `www/_assets/images/s.svg`.
- **fonts** (`*.{woff,woff2,eot,ttf,svg}`) : place them anywhere inside a `font` folder. Fonts are accessible using `www/_assets/fonts` (subpath is removed).
- **images** (`*.{jpg,png,gif}`) : place them anywhere in the `src` folder. They will be optimized, and accessible using `www/_assets/images/imageName` (subpath is removed).
- **sprite** (`*.{jpg,png,gif}`) : create a bitmap spritesheet by place images anywhere under a `sprite` folder. They will compile to a spritesheet + the required selectors to access images.
- **files** (`*.*`) : anything under a folder named `files` will be accessible using `www/_assets/fileName` (the subpath is removed).  
- **vendors** : source from other authors can be left untouched in placed in `src/_vendors`. Vendor files are copied to `www/_assets/vendors`, and keep their file structure.

_note : all paths and filenames can be adapted to your needs through the `gulp/_config.json` file._






## Work in Progress

### known Issues
- Watchers are not perfect : they may miss newly created folders and their content. You may need to stop and reload the builder.
- Also, in some cases two reloads seem needed for ensuring application of latest changes.
- The 'test' output may be confusing, as the file path display is wrong. This is necessary to keep a working 'gulp-newer' check.
- Browserify does not reload if user is surfing anywhere else than root index page.
- SCSS Style Maps are incorrect.


### Improvments ideas

#### version 0.3
- should clean generated CSS pages of unused selectors with gulp uncss (beware of dynamically generated selectors...)

#### version 0.4
- should write gulp scripts for audio & video
- should handle FTP deployment : automatic upload new files to FTP, delete unused files. 

#### version 0.5
- should handle server scripting (ex: using globs such as `**/server/**/*.*`)
- should handle PHP pages (both server and client)
s
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