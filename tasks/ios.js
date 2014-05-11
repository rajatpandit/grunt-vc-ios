/*
 * grunt-vc-ios
 * https://github.com/rajatpandit/grunt-vc-ios
 *
 * Copyright (c) 2014 Rajat Pandit
 * Licensed under the MIT license.
 */

'use strict';
var fs = require('fs'), semver = require('semver');
// adding contains method to emulate inarray
// http://stackoverflow.com/questions/11286979/how-to-search-in-an-array-in-node-js-in-a-non-blocking-way
// didn't want to add a complete library just for a single function
Array.prototype.contains = function(k, callback) {
    var self = this;
    return (function check(i) {
        if (i >= self.length) {
            return callback(false);
        }

        if (self[i] === k) {
            return callback(true);
        }

        return process.nextTick(check.bind(null, i+1));
    }(0));
};


module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks
  grunt.registerTask('ios', 'Updates ios info.plist and changes application version. written for environments where plistbuddy is to available', function(file, bump_type) {
      grunt.log.writeln('Called from the ios task');
      var done = this.async(), new_version = '';
      // sed -e '/CFBundleVersion/N' -e "s/\(CFBundleVersion.*<string>\).*\(<\/string>\)/\1${BUILD_NUMBER}\2/"
      grunt.util.spawn({
          cmd: 'xmlstarlet',
          args: ['sel', '-t', '-v', "//key[contains(text(),'CFBundleVersion')]/following-sibling::string[1]/text()", file]
      }, function(err, result, code) {
        if (err) {
            grunt.log.writeln('Unable to locate the version number for the bundle, bailing out');
            done(false);
            throw err; // TODO improve error handling
        }
        // get the version and bump up the version
        grunt.log.writeln('Current version: ' + result);
        if ('' === result) {
            grunt.log.writeln('No version was found in the in the plist file. Please validate the format');
        }
        var valid_bump_type = ['major', 'minor', 'patch', 'prerelease'];
        valid_bump_type.contains(bump_type, function(found) {
            if (true === found) {
                result = result.toString(); // convert this into a string value to keep semver happy
                if (semver.valid(result)) {
                    new_version = semver.inc(result, bump_type);
                    grunt.log.writeln('Updating version to %s', new_version);
                    // update the file with the new version number
                    grunt.util.spawn({
                        cmd: 'xmlstarlet',
                        args: ['ed', '-L', '-t', '-u', "//key[contains(text(),'CFBundleVersion')]/following-sibling::string[1]/text()", '-v', new_version, file]
                    }, function(err, result, code) {
                        if (err) {
                            grunt.log.writeln('Error while trying to update the file %s, please re-check the file format', file);
                            done(false);
                            throw err;
                        }
                        grunt.log.writeln('Version updated to %s', new_version);
                    });
                } else {
                    grunt.log.writeln('Invalid version format found in the plist file: %s', result);
                }
            } else {
                grunt.log.writeln('Invalid bump type value passed, please check semver documentation to see the allowed values');
            }
        });
        done();
      });
  });
};
