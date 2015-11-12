# Upgrade

Indicative follows [semver](http://semver.org/) to release the latest version on npm. Which means minor and patch upgrades will never break your code and for major releases, you are supposed to read the upgrade guide and look for breaking changes.

- [version 2](#version-2)
  - [summary](#summary)
  - [breaking changes](#breaking-changes)
- [version 1](#version-1)
  - [changelog](#changelog)

## Version 2
Version 2 is a complete re-write of indicative to improve performance and get rid of CoffeeScript. Any reported bugs or merged pull requests have been fixed/included in v2.

### Summary

1. The Newer version has dropped CoffeeScript and made use of vanilla javascript.
2. Removed `is.js` and now has its own raw validator.
3. No classes.
4. Parser performance to parse rules improved by 100x.
5. Supports getter methods for defining messages.
6. Ability to extend raw validator.

### Breaking changes

Since it is a complete re-write and for betterment, there are breaking changes in the way you have been consuming indicative. Also, some rules have been removed from as they were not quite usable.

#### Using indicative

**earlier**
```javascript,line-numbers
const Indicative = require('indicative')
const indicative = new Indicative()
indicative.validate()
```

**now**
```javascript,line-numbers
const indicative = require('indicative')
indicative.validate()
```

#### args are array now

earlier you need to split rule arguments with `,` to get an array, but now the parser will split them for you and passes an array to custom rules.

**earlier**
```javascript,line-number
const phone = function (data, field, message, args) {
  args = args.split(',')
  console.log(args)
  // outputs []
}
```

**now**
```javascript,line-number
const phone = function (data, field, message, args, get) {
  console.log(args)
  // outputs []
}
```

#### Defining custom rules

when defining custom rules, your callback method will get additional parameter called `get`, which is a function to fetch nested properties from the data object and is highly recommended to use it.

**earlier**
```javascript,line-number
const phone = function (data, field, message, args) {
  const fieldValue = data[field]
}
```

**now**
```javascript,line-number
const phone = function (data, field, message, args, get) {
  const fieldValue = get(data, field)
}
```

## Version 1

Below is the changelog for all the issues been reported and fixed in version 1.

### 1.3.1
*Required validation now ignores booleans and numeric booleans, achieved by removing IS.truthy check*

- [Required validation now ignores booleans and numeric booleans](https://github.com/Adonis-Js/indicative/pull/28)
- [required rule for integer=0](https://github.com/Adonis-Js/indicative/issues/27)

### 1.3.0
*Introduced two new rules to define dates after or before a given offset*

- [add beforeNow & afterNow rules](https://github.com/Adonis-Js/indicative/pull/26)

### 1.2.10 & 1.2.9
*Running validateAll method inside a loop of promises was stacking errors for each call*

- [fix reporting error in validateAll](https://github.com/Adonis-Js/indicative/issues/25)
- [fix simultaneous validateAll calls error reporting](https://github.com/Adonis-Js/indicative/issues/22)
- [validateAll - error not complete](https://github.com/Adonis-Js/indicative/issues/24)

### v1.2.6
*Email validation was validating null values as required validation should handle null values*

- [commit](https://github.com/Adonis-Js/indicative/commit/49bea8dc3534849e43562ec4b00091b1aa92be8e)
- [email validation trouble](https://github.com/Adonis-Js/indicative/issues/17)
