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

## Features v0.2

### *** DONE

#### Building steps
- **files, fonts & vendor scripts**: raw copy for all files from source to destination, 'in _assets' directory
- **pages**: building html using partials
- **styles**: Sass preprocessors, minifying, sourcemaps, compatibility prefixes
- **images**: bitmaps compression, vector optimized spritesheet, bitmap optimized spritesheet
- **scripts**: concatenation, minifying & sourcemaps, code wrapping, using plumber

#### Other
- **easy config**: paths & operations, building sequences
- **'light' on CPU**: applying scripts only on needed files
- **browserify** : test your website locally, on multiple browsers & devices simultaneously (desktops, tablets, smartphones)
- **livereload** : any change is automatically saved, and browser is refreshed





### *** FOR FUTURE RELEASES

#### Feature v0.3
- **FTP deployment** : automatic upload to FTP
- **uncss** : clean generated CSS pages from unused selectors (beware of dynamically generated selectors...)


## Notes

### known Issues
- Watchers may miss newly created folders and their content. Just force the reload by saving the type of file concerned.
- For 'gulp-using', the console log of the file path is confusing. This is necessary to keep the 'gulp-newer' check working.
- Changing a HTML partial will not rebuild the "caller" file, unless the "newer" package is deactivated on this task
- Some elements may need two reload to properly update. (ex: stylesheet built in two steps)

### Improvments ideas
- Solving the known issues (any hint / help is welcome!)
- should handle PHP pages
- should be able to work external frameworks (Ember, Meteor...)
- should accept typescript
- include server globs scripting
- be able to keep subfolder structure when copying elements found with **/{name} /**/*.*
- be able to prepare one subset of scripts / style for landing page (used to have a very quick first load)
- **git integration** with creating/initiating and/or automatic commit & push to remote
- **up-to-date documentation**: links to used libraries, explaining default structuring / naming rules on files
- should automate bitmap image resizing (ex: for background)
- improve rebuild of scss to prevent having to include partials in.
- "assets" folder should be reduced as _components grows : _components is like a component