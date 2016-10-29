# How to use
===============

**Important :** All quoted globs and directory are thoses set by default. Various elements can be configured in the `_config.json` file.


#### Overview
website-builder is a tool for automating various operations during a website building.
It aims at easing the life of the web designer / integrator.

Basically, it automates usual operations / optimization that may be required on typical website elements : pages, scripts, styles, spritesheets.
It also work well together with external tools such as illustrator and photoshop.
In practice you save a lot of reloading time,thus making your production process a lot smoother.


#### settings

All settings are done through the `_gulp/_config.json` file. Below text usually refer to this file. 

#### init

The builder entry point is `./gulpfile.js`, started whenever you run `gulp` from the command shell.
It calls the `_starter` task, which describes various building sequence. (ex: scripter, designer, tester... )

### tasks

Each building steps is a task, usually described in its own JS file. The builder runs various task simultaneoulsy, each of them with a fairly similar process :
- SOURCE files are selected by the task, using a 'glob'
- These files are processed, by performed a chain of operations specific to the performed task
- once finished, the resulting file(s) go(es) to the DESTINATION folder

#### environnement

Two working environnement are defined so far :
- **production** : set 'isProd' to true to activate. Includes additional building steps, reducing build performance, but generating more optimized files.
- **test** : set 'isTest' to true to activate. Generates additional output in the console, and allows a close follow up of the process : which files are used,
details for any error, double check on globs...


#### building steps

Each single building step can be activated / deactivaed. Just turn the corresponding line to `true` or `false`.

ex:
- `"processFiles" : true`,
- `"processScripts": true`,
-    `"wrapScript": false`,

##### browser

List the browsers which should be opened when building. One is enough for development (but not for testing). Many is good for testing, but not for development...
For windows user, please ensure the executable names are listed in your %PATH%.

#####  globs

For each specific task, you will typically find a SRC and a DEST glob.


