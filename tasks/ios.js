/*
 * grunt-vc-ios
 * https://github.com/rajatpandit/grunt-vc-ios
 *
 * Copyright (c) 2014 Rajat Pandit
 * Licensed under the MIT license.
 */

'use strict';
// TODO identify the issue
// For some reason javascript thinks the regular expression is an otal literal
// Octal integer literals are deprecated and have been removed from the ECMA-262, Edition 3 standard (in strict mode). JavaScript 1.5 still supports them for backward compatibility.
var fs = require('fs');
module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerTask('ios', 'Updates ios info.plist and changes application version. written for environments where plistbuddy is to available', function(file) {
      grunt.log.writeln('Called from the ios task');
      var done = this.async(), new_version = '8.8.8';
      // sed -e '/CFBundleVersion/N' -e "s/\(CFBundleVersion.*<string>\).*\(<\/string>\)/\1${BUILD_NUMBER}\2/"
      grunt.util.spawn({
          cmd: 'sed',
          args: ['-e', '/CFBundleVersion/N', '-e', 's/\\(CFBundleVersion.*<string>\\).*\\(<\\/string>\\)/\\1' + new_version + '\\2/', file]
      }, function(err, result, code) {
        if (err) {
            done(false);
            throw err; // TODO improve error handling
        }
        // write that to the file again
        fs.writeFile(file, result, function(err) {
            if (err) {
                done(false);
                throw err; // TODO do a better implementation for error handling
            }
            done();
            grunt.log.writeln("Version updated to %s", new_version);
        });
      });
  });
};
