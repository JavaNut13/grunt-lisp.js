/*
 * grunt-lisp.js
 * https://github.com/javanut13/grunt-lisp.js
 *
 * Copyright (c) 2016 Will Richardson
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Configuration to be run (and then tested).
    lisp_js: {
      default_options: {
        src: [
          'test/res/**/*'
        ],
        dest: 'tmp/default'
      },
      custom_options: {
        options: {
          cut: 'test/res/',
          extend: require('./test/extend')
        },
        src: [
          'test/res/**/*'
        ],
        dest: 'tmp/custom'
      }
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  grunt.registerTask('default', ['lisp_js']);
};
