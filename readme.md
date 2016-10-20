# Website builder

## Overview

A simple builder automating some operations for website building. Reads files from a source folder (ex:src/),
performs various operations & optimization on files (pages, scripts, styles...)
and generates a destination folder (ex: www/ or dist/).
This builder was thought for basic website. It may not be adapted for bigger projects, or thoses implying other frameworks.
Any remark or suggestion are welcome.

## Get Started

- git clone https://github.com/bmargogne/website-builder.git
- cd website-builder
- npm install
- run 'gulp' and start working on your files
- open '_gulp/config.json' to adjust the builder to your needs

## Features

### ** done
- files, fonts, vendor scripts: raw copy for all files not needing any treatment

### ** in progress
- scripts: linting, concatenation, minifying & sourcemaps
- styles: Sass preprocessors, compatibility prefixes, delete unused CSS properties, minifying & sourcemaps
- fully configurable path & operations (various building sequences)
- applying scripts only on needed files

### ** todo
- pages: building html using partials
- images: compression, stylesheet generation
- vector graphics: compression, stylesheet generation
- browserify : test your pages simultaneously on multiple browsers & devices (desktops, tablets, smartphones)
- livereload : any change is automatically saved, and browser is refreshed
- deployment : automatic upload to FTP
- write additional documentation to use this builder tool


## known Issues
- gulp crashes upon file deletion / renaming

## Improvments ideas
- should use plumber to prevent some crashes
- should handle PHP pages
- should integrate git functionnalities
- should give more freedom on "vendors" location. Ex: SRC could look like '**/vendors/*', and DEST could look like '_assets/vendors' while keeping sub-tree structure