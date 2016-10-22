# Website builder
================

v0.0.1
by Bertrand Margogne.


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

## Features v0.1.2

### DONE

#### Building steps
- **files, fonts & vendor scripts**: raw copy for all files from source to destination, 'in _assets' directory
- **pages**: building html using partials
- **styles**: Sass preprocessors, minifying, sourcemaps
- **images**: bitmaps compression, vector optimized spritesheet, bitmap optimized spritesheet
- **scripts**: concatenation, minifying & sourcemaps, using plumber

#### Other
- **easy config**: paths & operations, building sequences
- **'light' on CPU**: applying scripts only on needed files
- **browserify** : test your website locally, on multiple browsers & devices simultaneously (desktops, tablets, smartphones)
- **livereload** : any change is automatically saved, and browser is refreshed

### IN PROGRESS

- **scripts** : should concatenate resulting strict in a "on document ready"
- **style** : compatibility prefix
- **documentation**: links to used libraries, explaining default structuring / naming rules on files

### TODO

- **styles**: compatibility prefixes
- **FTP deployment** : automatic upload to FTP
- **GIT deployment** : automatic commit & push to remote


## known Issues
- Watchers may miss newly created folders and their content. However creating files in existing directory is watched correctly.
- For gulp-using, the console log of the file path may be confusing when changing 'dirname' from gulp-rename.
- Changing a HTML partial will not rebuild the "caller" file
- Some elements may need two reload to properly update. (even with disable cache option)
- gulp-minify will return a syntax error when writing ES6

## Improvments ideas
- should use plumber to prevent some repeated crashes if any
- should handle PHP pages
- should be able to work external frameworks (Ember, Meteor...)
- should accept typescript
- test if it works for server scripting ()
- add the link to package documentation directly in code