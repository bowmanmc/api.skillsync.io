'use strict';
/**
 * Gulpfile.js - for tasks I haven't moved over to plain npm yet...
 */
var gulp        = require('gulp');
var zip         = require('gulp-zip');
var execSync    = require('sync-exec');
var fs          = require('fs');
var moment      = require('moment');
var os          = require('os');
var pkg         = require('./package.json');
var runSequence = require('run-sequence');


gulp.task('dist', function() {
    runSequence('copy', 'version', 'compress');
});


gulp.task('compress', function() {
    var outName = 'api.skillsync.io-' + pkg.version + '.zip';
    return gulp.src('build/*')
        .pipe(zip(outName))
        .pipe(gulp.dest('dist'));
});


gulp.task('copy', function() {
    return gulp.src('src/**/*')
        .pipe(gulp.dest('build'));
});

gulp.task('version', function() {

    var ver = 'build/version.txt';
    var now = moment();

    // get current git revision from git.
    // Requires 'git' command line!!
    var rev = 'Not Available';
    var branch = 'Not Available';
    try {
        rev = execSync('git rev-parse HEAD').stdout.trim();
        branch = execSync('git rev-parse --abbrev-ref HEAD').stdout.trim();
    }
    catch (err) {
        console.log('Error running "git rev-parse HEAD"');
        console.log('    ' + err.message);
    }

    fs.appendFileSync(ver, '\nSkillSync.io - API');
    fs.appendFileSync(ver, '\n===================');
    fs.appendFileSync(ver, '\nName: ' + pkg.name);
    fs.appendFileSync(ver, '\nURL: https://github.com/bowmanmc/api.skillsync.io');
    fs.appendFileSync(ver, '\nVersion: ' + pkg.version);
    fs.appendFileSync(ver, '\nGit Branch: ' + branch);
    fs.appendFileSync(ver, '\nGit Revision: ' + rev);
    fs.appendFileSync(ver, '\nBuild Time: ' + now.format('YYYY-MM-DD HH:mm:ss'));
    fs.appendFileSync(ver, '\nBuild Host: ' + os.hostname() + ' [' + os.platform() + ']');
    fs.appendFileSync(ver, '\n');
    fs.appendFileSync(ver, '\n');
});


gulp.task('publish', function() {
    console.log('Publishing api.skillsync.io to AWS');
});
