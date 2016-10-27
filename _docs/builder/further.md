### 4. Go further

#### files at root level

- `gulpfile.js` : The builder entry file starter. It calls the first gulp task from any build sequence. Check options below.
- `.eslintrc` : The eslint rules applied. I'm a bit more 'flexible' that the recommendations... (for good reasons!) 
- `.gitignore` : Any file which does not need to be saved using git. Things like AI or PSD sources are ignored, or anything which can be generated trough the builder.
- `package.json` : 'meta information' on the project, such as the packages / dependencies needed for this builder. They install with `npm install`.



##### _assets
All basic elements common to the project, an

- `files` : any files common to the whole website. If anymore precise, the file should be placed in a 'files' subfolder from the component / page directory. 
- `fonts` : any fonts common to the whole website. If a font is only used in a specific component / page, it should be place together with it.
- `icons` : contains icons common the whole website. These icons like UI or logo may typically used by different components.
- `images` : contains the images common to the whole website. For instance, the website background. other image should be placed in page specific folders
- `scripts` : contains scripts common to the whole website. For instance, script adding test features or UI dynamics on html tag elements. 
- `styles` : contains the bootstrap set of rules, + the general project rules. 
- `app.scss` : the root style file, which should include all other partials used. This method centralise the dependencies, and at the end is the easiest to maintain 

##### _components
Built-in elements which can be reused in many parts of the projects. Typicals are header, footer, navbars ... but also includes photo gallery for instance. 
They include html partials (_.html), scripts, icons, style... anything to build a easy to include element in a page.
This folder will not exist once the website is generated.

##### _vendors
contain any exterior code/packages/library which should be left untouched.

##### pages
The website itself. Each page consist in a folder, containing all the specific code to this page: style, scripts, images, and other 'subpages'.
Nothing forces you to store your pages in this folder, but it helps to keep specific source files aside..


## F.A.Q

Some mistakes & solutions based on my own experience... Your feedbacks can complete this list !

### DOs and DONTs

- DON'T : work on files in the dest (www) directory, as they will be overwritten. work ONLY in the src

- IF something doesn't seem to happen when changing a style, it may be because the preprocessor is crashing
in such case, go to the console and scroll to check any Error message from the SASS pluging

### Some of my building steps are not running ??
if a building sequence seems incomplete :
- check if the building step is activated in the _config.json
- ensure the building step is referenced in the building sequence you are calling
- call just the single problematic task
- read the source code, as you may find some bugs

### What can I configure ?
- Building steps of the sequence can be (de)activated separately for testing purpose or targeted work
- All globs, path, and file names are stored in _config.json. feel free to adapt it for your needs
- set 'isProd' environnement for additional building steps (ex: compressing images or minifying files & generating sourcemaps)
- set 'isTest' for a (very) verbose build tools, allowing you to understand what is going on.
- set 'es6' to force usage of babel transpilation (you write 'new' ES6 javascript, he converts to 'old' ES5 javascript)
- select which browser should be opened when running the local server. Great for testing purpose, ... but only when needed.

### Testing & tweaking workflow
- start with gulp --test
- this opens multiple browsers (check _config.json.)
- you can open new windows and access your website at `http://localhost:3000`
- you can also reach your website in the local network. Use this to test with smartphones and tablets.
- browsers are synced: actions are (more or less) donne simultaneously on each browsers
- tweak your code and save. Changes are immediately visibles, as the page rebuilds (on compatible browsers)
- use the other browser as a before/after comparison (ex: changing primpary & secondary in color schemes)