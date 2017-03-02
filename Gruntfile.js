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
};
