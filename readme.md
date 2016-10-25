# Website builder
================

v0.3 - by Bertrand Margogne.


## Overview

A simple builder for automating some operations during website building. It performs various common operations / optimization on files (pages, scripts, styles, spritesheets...)

It was developped for working alone in a simple front-end project, using 'only' HTML, CSS & JS.
It may not be adapted for bigger projects, teams, and probably isn't compatible with other more complex frameworks.

This is my first project... in order to improve, I welcome any remark or suggestion (...and critics, provided they are constructive!).

## Get Started

You need node & npm installed. (...not sure which version, any feedback is appreciated)

- `git clone https://github.com/bmargogne/website-builder.git`
- `cd website-builder`
- `npm install`
- `run 'gulp'`

Now, when working in your editor, any changes will be instantly taken into account and your browser will reload.



`open '_gulp/_config.json' to adjust the builder to your needs`

_Note : temp files are volontary kept for debugging purpose. Run 'gulp clean' to get rid of them_

## Features completed

#### Building steps
- **files, fonts & vendor scripts**: raw copy for all files from source to destination, 'in _assets' directory
- **pages**: building html using partials
- **styles**: Sass preprocessors, minifying, sourcemaps, compatibility prefixes
- **images**: bitmaps compression, vector optimized spritesheet, bitmap optimized spritesheet
- **scripts**: concatenation, minifying, code wrapping, using plumber

#### Other
- **easy config**: paths & operations, building sequences
- **'light' on CPU**: applying scripts only on needed files
- **browserify** : test your website locally, on multiple browsers & devices simultaneously (desktops, tablets, smartphones)
- **livereload** : any change is automatically saved, and browser is refreshed


## Work in Progress

### known Issues
- Watchers may miss newly created folders and their content. Just force the reload by saving the type of file concerned.
- Also, some elements may need two reloads to properly update. (ex: stylesheet built in two steps)
- For 'gulp-using', the console log of the file path is confusing. This is necessary to keep the 'gulp-newer' check working.
- Changing a HTML partial will not rebuild the "caller" file, unless the "newer" package is deactivated on this task
- sourcemaps are created, but on the uncompressed files.

### Improvments ideas

#### version 0.3
- should handle FTP deployment : automatic upload new files to FTP, delete unused files. 
- should clean generated CSS pages of unused selectors with gulp uncss (beware of dynamically generated selectors...)

#### version ...who knows ??
- should solve known issues (any hint / help is welcome!)
- should handle server scripting (ex: using globs such as `**/server/**/*.*`)
- should handle PHP pages (both server and client)
- should be able to be compatible with some external frameworks (Ember, Meteor...)
- should accept typescript
- should be able to keep subfolder structure when copying elements
		(ex: from `**/{name}/**/*.*` to `{name}/**/*.*` rather than from `**/{name}/**/*.*` to `{name}/*.*`)  
- should be able to have specific smaller style & scripts files, for a quicker loading of landing page 
- should integrate git common tasks : creating/initiating repo, commit & push to remote
- should improve scss watching ( _why can't I exclude the partials?_ )
- should automate bitmap image resizing (ex: for optimzed webresponsive background)
- should keep a copy of all exploded collection (`**/{name}/**/*.*`) in the temp directory (... and use it as a reference to check what is there)
- should improve variable declarations in gulp to have a dryer code 

- "assets" folder should be emptied as _components grows: most common things should be thought as components. 
- more comprehensive documentation