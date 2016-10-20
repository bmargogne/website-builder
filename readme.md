# Website builder

## Overview

A simple builder automating some operations for website building. Reads files from a source folder (ex:src/),
performs various operations & optimization on files (pages, scripts, styles...)
and generates a destination folder (ex: www/ or dist/).
This builder was thought for basic website. It may not be adapted for bigger projects, or thoses implying other frameworks.
Any remark or suggestion are welcome.

## Feature

### DONE
- files, fonts, vendor scripts: raw copy for all files not needing any treatment

### IN PROGRESS
- scripts: linting, concatenation, minifying & sourcemaps
- styles: Sass preprocessors, compatibility prefixes, delete unused CSS properties, minifying & sourcemaps
- fully configurable path & operations (various building sequences)
- applying scripts only on needed files

### TODO
- pages: building html using partials
- images: compression, stylesheet generation
- vector graphics: compression, stylesheet generation
- browserify : test your pages simultaneously on multiple browsers & devices (desktops, tablets, smartphones)
- livereload : any change is automatically saved, and browser is refreshed
- deployment : automatic upload to FTP


## known Issues
- gulp crashes upon file deletion / renaming

## Future Improvments
- properly handle PHP pages
- Git integration