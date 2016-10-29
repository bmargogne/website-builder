### 4. Go further

#### files at root level

- `gulpfile.js` : The builder entry file starter. It calls the first gulp task from any build sequence. Check options below.
- `.eslintrc` : The eslint rules applied. I'm a bit more 'flexible' that the recommendations... (for good reasons!) 
- `.gitignore` : Any file which does not need to be saved using git. Things like AI or PSD sources are ignored, or anything which can be generated trough the builder.
- `package.json` : 'meta information' on the project, such as the packages / dependencies needed for this builder. They install with `npm install`.


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