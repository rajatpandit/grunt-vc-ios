# grunt-vs-ios

> Updates ios info.plist and changes application version. written for environments where plistbuddy is to available'

## Getting Started
This plugin requires Grunt `~0.4.4`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-vs-ios --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-vs-ios');
```

## The "ios" task

### Overview
In your project's Gruntfile, add a section named `vs_ios` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  vs_ios: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```
### Usage Examples
```bash
> grunt ios:Info.plist:patch
Running "ios:Info.plist:patch" (ios) task
Called from the ios task
Current version: 0.0.4
Updating version to 0.0.5
```
Check out documentation for semver  to see the options that can be passed

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
