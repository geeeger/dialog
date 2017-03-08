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
            var success = shell.exec(cmd, {
                silent: false
            }).code === 0;

            if (success) {
                grunt.log.ok(msg || cmd);
                deferred.resolve();
            } else {
                deferred.reject('Failed when executing: `' + cmd + '`\n');
            }
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

        new Q()
            .then(release)
            .catch(function (e) {
                grunt.fail.warn(e || 'release failed');
            })
    })
};
