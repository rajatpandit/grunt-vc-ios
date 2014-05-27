/*
 * grunt-vc-ios
 * https://github.com/rajatpandit/grunt-vc-ios
 *
 * Copyright (c) 2014 Rajat Pandit
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
    grunt.registerTask('ios', 'Updates ios info.plist and changes application version. written for environments where plistbuddy is not available', function(file, bump_type) {
    grunt.log.writeln('Processing the request using composing for file %s', file);

    var done                = this.async(),
        options             = this.options(),
        semver              = require('semver'),
        async               = require('async'),
        write_version       = function (input, callback) {
            var new_version = '';
            switch(input.mode) {
                case 'nightly':
                    // returns back concatinated string back for version
                    new_version = bump_as_nightly(input.version, bump_type); // in this case it will be what is passed via jenkins
                    break;
                case 'semver':
                    // calls semver for new version number
                    new_version = bump_as_semver(input.version, bump_type);
                    break;
                default:
                    // default to nightly
                    new_version = bump_as_nightly(input.version, bump_type); // in this case it will be what is passed via jenkins
                    break;
            }
            callback(null, new_version);
        },

        bump_as_nightly = function(version, build) {
            return version + '+' + build;
        },

        bump_as_semver = function(version, build) {
            var new_version = -1; // return -1 if the version number isn't valid
            if (semver.valid(version)) {
                version = semver.clean(version); // remove any nightly build info
                new_version = semver.inc(version, build);
            }
            return new_version;
        },

        read_version = function (input, callback) {
            grunt.util.spawn({
                cmd: '/usr/local/bin/xmlstarlet',
                args: ['sel', '-t', '-v', "//key[contains(text(),'CFBundleVersion')]/following-sibling::string[1]/text()", input.file]
            },function (err, result, code) {
                if (err) {
                    callback(err); // callback with the error object
                    done();
                }
                grunt.log.writeln('Current version found to be %s', result);
                callback(null, {
                    version : result.toString(),
                    file    : input.file,
                    mode    : input.mode
                });
                done();
            });
        },

       update_version = async.compose(write_version, read_version);
           update_version({file: file, mode: options.mode, bump_type: bump_type}, function(err, result) {
               grunt.log.writeln('The version is now updated to %s', result.toString()); //
           });
       });
};
