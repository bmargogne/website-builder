# Website builder

## Overview

A simple builder for automating some operations during website building. It performs various common operations / optimization on files (pages, scripts, styles...)

It is thought for using alone on simple web front-end projects using only HTML, CSS & JS.
It may not be adapted for bigger projects, teams, and is probably not compatible with other frameworks.

This is my first project, and any remark or suggestion is welcome.

## Get Started

- you need node & npm installed. (not sure which version, any feedback is appreciated)

shell git clone https://github.com/bmargogne/website-builder.git
shell cd website-builder
shell npm install
shell run 'gulp' and start working on your files
shell open '_gulp/_config.json' to adjust the builder to your needs

## Features

### ** done
- **files, fonts & vendor scripts**: raw copy for all files from source to destination, 'in _assets' directory

### ** in progress
- **images**: compression, stylesheet generation
- **pages**: building html using partials
- **scripts**: linting, concatenation, minifying & sourcemaps
- **styles**: Sass preprocessors, compatibility prefixes, delete unused CSS properties, minifying & sourcemaps
- **Easy config**: paths & operations, building sequences, verbose...
- **browserify** : test your pages locally, simultaneously on multiple browsers & devices (desktops, tablets, smartphones)
- **'light' on CPU**: applying scripts only on needed files
- **documentation**: links to used libraries, default structuring / naming rules on files

### ** todo
- **vector graphics**: compression, stylesheet generation
- **livereload** : any change is automatically saved, and browser is refreshed
- **FTP deployment** : automatic upload to FTP
- **GIT deployment** : automatic commit & push to remote


## known Issues
- Watchers may miss newly created folders and their content. However creating files in existing directory is watched correctly.
- For gulp-using, the console log of the file path may be confusing when changing 'dirname' from gulp-rename.
- Changing a HTML partial will not rebuild the "caller" file

## Improvments ideas
- should use plumber to prevent some repeated crashes if any
- should handle PHP pages
- should give more freedom on "vendors" location. Ex: SRC could look like '**/vendors/*', and DEST could look like '_assets/vendors' while keeping sub-tree structure
- should be able to work external frameworks (Ember, Meteor...)
- should accept typescript
- test if it works for server scripting ()