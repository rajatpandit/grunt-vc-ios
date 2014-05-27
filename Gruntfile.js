/*
 * grunt-vs-ios
 * https://github.com/rajatpandit/grunt-vs-ios
 *
 * Copyright (c) 2014 Rajat Pandit
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    // Configuration to be run (and then tested).
    ios: {
        options: {
            mode: "semver" // this could also be semver
        }
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');
  // By default, lint and run all tests.
  grunt.registerTask('default', ['ios']);

};
