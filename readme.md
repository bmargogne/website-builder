# Website builder
================

v0.3 - by Bertrand Margogne.


## Overview

A builder tool for automating various operations during a website building.
It performs various common operations / optimization on files : pages, scripts, styles, spritesheets...
In practice you same a lot of reloading time, thus making your production process a lot smoother. 

It was developped for working alone in a simple front-end project (using 'only' HTML, CSS & JS),
and may not be adapted for bigger projects or teams.  
Though nothing was tested yet, it probably isn't compatible with other more complex frameworks.

This is my first project... in order to improve, I welcome any remark or suggestion ...and (constructive) critics !

## Get Started

You need node & npm installed. (...not sure which version, any feedback is appreciated)

- `git clone https://github.com/bmargogne/website-builder.git`
- `cd website-builder`
- `npm install`
- `run 'gulp'`

This opens the demo menu, containing various tests and the demo website.
Open your editor in the website builder directory, and explore !

If you edit anything from the `src` directory, the builder will run and the page will reload
with any applied change on html, style, script, image update, svg generation, etc.

Start from there and build your site !


### good to known

Luckily enough (but also after lots of renamings...), the file tree is organized to help the discovery of the project.
User is encouraged to play with it to be able to tweak the system to its needs.

#### files at root level
You don't really need to dig into this unless you need to. (who wanted to disable the linting?)

- `.eslintrc` : The eslint rules applied. I'm a bit more 'flexible' that the recommendations... (for good reasons!) 
- `.gitignore` : All personnal files, or files that can be generated are not saved in git. Things like AI icon sources are ignored.
- `gulpfile.js` : The build-starter. run gulp for default building sequence. Check options below.
- `package.json` : describes all the packages needed for this builder. They install with `npm install`.

#### folders at root level
- `_docs` : Further info + the builder reference. They are a few naming rules to follow, go there to read them. 
- `_gulp` : contains the builder `.js` files & config `.json`.
- `_gulp/_config.json` : contains all the parameter to adjust all building sequences.
- `_gulp/_starter.js` : contains the first task which define the building sequence.
- `src` : contains the demo website & tests files. Remove them whenever and place your website source files there.

after running `gulp` you will see 
- `_temp` : contains some debugging files (ex: intermediary css) and some other file listing, used as reference. _Run 'gulp clean' to get rid of them_
- `www` : contains the website which should be serve to the internet. Typically, upload it to a ftp.  
- `node_modules` : the npm packages needed to run the builder. There are a hello lot of them, and you should not need to dig into this anyway. 


### in the `src` folder

#### _assets
All basic elements common to the project, an

- `files` : any files common to the whole website. If anymore precise, the file should be placed in a 'files' subfolder from the component / page directory. 
- `fonts` : any fonts common to the whole website. If a font is only used in a specific component / page, it should be place together with it.
- `icons` : contains icons common the whole website. These icons like UI or logo may typically used by different components.
- `images` : contains the images common to the whole website. For instance, the website background. other image should be placed in page specific folders
- `scripts` : contains scripts common to the whole website. For instance, script adding test features or UI dynamics on html tag elements. 
- `styles` : contains the bootstrap set of rules, + the general project rules. 
- `app.scss` : the root style file, which should include all other partials used. This method centralise the dependencies, and at the end is the easiest to maintain 

#### _components
Built-in elements which can be reused in many parts of the projects. Typicals are header, footer, navbars ... but also includes photo gallery for instance. 
They include html partials (_.html), scripts, icons, style... anything to build a easy to include element in a page.
This folder will not exist once the website is generated.

#### _vendors
contain any exterior code/packages/library which should be left untouched.

#### pages
The website itself. Each page consist in a folder, containing all the specific code to this page: style, scripts, images, and other 'subpages'.
Nothing forces you to store your pages in this folder, but it helps to keep specific source files aside.

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
		(ex: from `**/{name}/**/*.*` to `{name}/**/*.*` rather than from `**/{name}/**/*.*` to `{name}/*.*`)  
- should be able to have specific smaller style & scripts files, for a quicker loading of landing page 
- should integrate git common tasks : creating/initiating repo, commit & push to remote
- should improve scss watching ( _why can't I exclude the partials?_ )
- should automate bitmap image resizing (ex: for optimzed webresponsive background)
- should keep a copy of all exploded collection (`**/{name}/**/*.*`) in the temp directory (... and use it as a reference to check what is there)
- should improve variable declarations in gulp to have a dryer code 

- `assets` folder should be emptied as `_components` are created: most common things should be thought as components.
	Eventually, the assets are kept to minimal, as specific assets are better stored in the related folder, together with html, script and style. 
- more comprehensive documentation
- should regroup any md file, and automatically generate a page with a 'reading list' creation.
	(--> a big file needs no click, hence no interruption, hence more uninterrompted focused reading... more efficient ! )