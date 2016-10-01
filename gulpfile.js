var argv = require('yargs').argv;
var gulp = require('gulp');
var requireDir = require('require-dir');
var runSequence = require('run-sequence');

var config = require('./config.json')
var tasks = requireDir('./gulp_tasks')

gulp.task('default', function () {

    if (argv.profile) {
        switch(argv.profile) {
            case "builder": startBuilder(); break;
            case "tester": startTester(); break;
            default: console.log( "parameter unkown" );
        }
    }
    else {
        startAll();
        console.log( "please provide a --profile parameter (WIP: builder, tester, TODO: scripter, webdesigner, deployer)" );
    }
});


function startAll() {
     runSequence(   'clean',
                    ['copyVendors', 'copyScripts'],
                    'buildHtml');
}

function startBuilder() {

     runSequence(   /* TODO : build specifi sequence */ );
}

function startTester() {

     runSequence(   /* TODO : build specifi sequence */ );
}