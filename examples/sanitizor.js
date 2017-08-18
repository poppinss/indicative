'use strict'

const indicative = require('../')

const data = {
  profile: {
    email: 'bar.sneak+foo@googlemail.com'
  },
  age: '22',
  aboutMe: 'Hi guys i am dev @<a href="http://nowhere.com">punpin</a>'
}

const sanitizationRules = {
  'profile.email': 'normalize_email',
  age: 'to_int',
  aboutMe: 'strip_links'
}

console.log(indicative.sanitize(data, sanitizationRules))
console.log(indicative.sanitizor.blacklist('hello world', ['ord']))
indicative.sanitizor.extend('uppercase', function (value) {
  return value.toUpperCase()
})
console.log(indicative.sanitizor.uppercase('hello world'))
