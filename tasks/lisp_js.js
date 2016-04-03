/*
 * grunt-lisp.js
 * https://github.com/javanut13/grunt-lisp.js
 *
 * Copyright (c) 2016 Will Richardson
 * Licensed under the MIT license.
 */

'use strict';

var lispjs = require('@javanut13/lisp.js');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('lisp_js', 'Transpile lisp to JS', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      extension: 'lsp',
    });
    
    // If an include file was given, run it and pass in lispjs so it can extend
    if(options.extend) {
      options.extend(lispjs);
    }

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var files = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else if(grunt.file.isDir(filepath)) {
          return false;
        } else {
          return true;
        }
      });
      
      
      var extension = options['extension'];
      var remove = options['cut'];
      var dest = f.dest.endsWith('/') ? f.dest : f.dest + '/';
      for(var i = 0; i < files.length; i++) {
        var filepath = files[i];
        var code = lispjs.toJS(grunt.file.read(filepath));
        if(filepath.endsWith(extension)) {
          filepath = filepath.slice(0, filepath.length - extension.length - 1);
        }
        if(remove && filepath.startsWith(remove)) {
          filepath = filepath.slice(remove.length);
        }
        grunt.file.write(dest + filepath + '.js', code);
      }

      // Handle options.
      // src += options.punctuation;
//
//       // Write the destination file.
//       grunt.file.write(f.dest, src);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
