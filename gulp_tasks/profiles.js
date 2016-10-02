const argv = require('yargs').argv;
const exec = require('gulp-exec');
const gulp = require('gulp');
const requireDir = require('require-dir');
const runSequence = require('run-sequence');

const config = require('../config.json');
const tasks = requireDir('./');



gulp.task('profiles', function () {

    if (argv.profile) {
        switch(argv.profile) {
            case "builder": startBuilder(); break;
            case "tester": startTester(); break;
            default: console.log( "parameter unkown" );
        }
    }
    else {
        console.log( "running default profile. Use --profile (WIP: builder, tester, TODO: scripter, webdesigner, deployer)" );
        startSequence();
    }
});


function startSequence() {
     return runSequence(   'clean',
                    ['files',
                    'scripts',
                    'styles' ,
                    'buildHtml']);
}

function startBuilder() {
     return runSequence(   /* TODO : build specific sequence (with parallel tasks) */ );
}

function startTester() {
     return runSequence(   /* TODO : build specific sequence (with parallel tasks) */ );
}