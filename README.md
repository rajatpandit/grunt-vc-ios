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
grunt.loadNpmTasks('grunt-vc-ios');
```

## The "ios" task

### Overview
In your project's Gruntfile, add a section named `vs_ios` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  ios: {
    options: {
      mode: 'nightly' // the other option is to use semver which will update the version using semver
    },
  },
});
```
### Usage Examples
## Using the nightly mode

```bash
> grunt ios:Info.plist:build1237
Running "ios:Info.plist:build1237" (ios) task
Processing the request using composing for file Info.plist
Current version found to be 0.0.1+build1236
The new version is 0.0.1+build1237
```
## Using the semver mode
```
[rp@sodium grunt-vc-ios (master ✗)]$ grunt ios:Info.plist:patch
Running "ios:Info.plist:patch" (ios) task
Processing the request using composing for file Info.plist
Current version found to be 0.0.1+build1237
The new version is 0.0.2
```

Check out documentation for semver  to see the options that can be passed

## Contributing

## Release History
