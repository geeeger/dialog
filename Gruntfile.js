module.exports = function(grunt) {
    'use strict';

    require('load-grunt-tasks')(grunt);
    var taskConfig = require('config-grunt-tasks')(grunt, './tasks');

    taskConfig.pkg = require('./package.json');
    grunt.initConfig(taskConfig);

    grunt.registerTask('build', ['eslint:all', 'browserify:build', 'uglify:build']);
    grunt.registerTask('lint', ['eslint:all']);
    grunt.registerTask('serve', ['build', 'concurrent:build']);
    grunt.registerTask('test', ['connect:test', 'mocha:test']);
    grunt.registerTask('demo', ['connect:demo']);
    var shell = require('shelljs');
    var Q = require('q');
    grunt.registerTask('release-it', function () {
        function run(cmd, msg) {
            var deferred = Q.defer();
            grunt.verbose.writeln('Running: ' + cmd);

            // if (nowrite) {
            //     grunt.log.ok(msg || cmd);
            //     deferred.resolve();
            // } else {
                var success = shell.exec(cmd, {
                    silent: false
                }).code === 0;

                if (success) {
                    grunt.log.ok(msg || cmd);
                    deferred.resolve();
                } else {
                    // fail and stop execution of further tasks
                    deferred.reject('Failed when executing: `' + cmd + '`\n');
                }
            // }
            return deferred.promise;
        }

        function release() {
            return run([
                'cd ./dist/',
                'git init',
                'git remote add origin http://git.qietv.work/frontend-common/dialog-release.git',
                'git add .',
                'git commit -m "release"',
                'git push origin master --force',
                'rm -rf ./git'
            ].join(' && '), 'release');
        }
        // function move2() {
        //     return run('ls', 'ls');
        // }

        // function init() {
        //     return run(, 'init .git');
        // }

        // function addOrigin() {
        //     return run(, 'add remote origin http://git.qietv.work/frontend-common/dialog-release.git');
        // }

        // function add() {
        //     return run(, 'add all the files to tracks');
        // }

        // function commit() {
        //     return run(, 'commit: release');
        // }

        // function push() {
        //     return run(, 'push by force');
        // }

        // function done() {
        //     return run('');
        // }

        new Q()
            .then(release)
            // .then(move2)
            // .then(init)
            // .then(addOrigin)
            // .then(add)
            // .then(commit)
            // .then(push)
            .catch(function (e) {
                grunt.fail.warn(e || 'release failed');
            })
            // .finally(done)
    })
};
