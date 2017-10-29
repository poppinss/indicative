'use strict'

/**
 * indicative
 * Copyright(c) 2016-2016 Harminder Virk
 * MIT Licensed
*/

const test = require('japa')
const SanitizationFilters = require('../src/Sanitization/filters')
const Sanitization = require('../src/Sanitization')

test.group('SanitizationFilters', function () {
  test('should escape html div using escape method', function (assert) {
    const sanitized = SanitizationFilters.escape('<div id="foo"> hello </div>')
    assert.equal(sanitized, '&lt;div id=&quot;foo&quot;&gt; hello &lt;&#x2F;div&gt;')
  })

  test('should escape & symbol', function (assert) {
    const sanitized = SanitizationFilters.escape('Hello & hi')
    assert.equal(sanitized, 'Hello &amp; hi')
  })

  test('should return actual value when value is not string', function (assert) {
    const sanitized = SanitizationFilters.escape({name: 'foo'})
    assert.deepEqual(sanitized, {name: 'foo'})
  })

  test('should accept the first arguement only', function (assert) {
    const sanitized = SanitizationFilters.normalizeEmail('bar.sneaky@gmail.com')
    assert.equal(sanitized, 'barsneaky@gmail.com')
  })

  test('should remove dots from an email', function (assert) {
    const sanitized = SanitizationFilters.normalizeEmail('bar.sneaky@gmail.com', [])
    assert.equal(sanitized, 'barsneaky@gmail.com')
  })

  test('should remove everything after + from an email address', function (assert) {
    const sanitized = SanitizationFilters.normalizeEmail('bar.sneaky+foo@gmail.com', [])
    assert.equal(sanitized, 'barsneaky@gmail.com')
  })

  test('should convert email to lowercase', function (assert) {
    const sanitized = SanitizationFilters.normalizeEmail('BAR.sneaky+foo@GMAIL.com', [])
    assert.equal(sanitized, 'barsneaky@gmail.com')
  })

  test('should convert googlemail.com to gmail.com', function (assert) {
    const sanitized = SanitizationFilters.normalizeEmail('BAR.sneaky+foo@googlemail.com', [])
    assert.equal(sanitized, 'barsneaky@gmail.com')
  })

  test('should convert googlemail.com to gmail.com', function (assert) {
    const sanitized = SanitizationFilters.normalizeEmail('BAR.sneaky+foo@googlemail.com', [])
    assert.equal(sanitized, 'barsneaky@gmail.com')
  })

  test('should return original value when integer is passed', function (assert) {
    const sanitized = SanitizationFilters.normalizeEmail(1111, [])
    assert.equal(sanitized, 1111)
  })

  test('should return original when email like pattern is not passed', function (assert) {
    const sanitized = SanitizationFilters.normalizeEmail('hello.world', [])
    assert.equal(sanitized, 'hello.world')
  })

  test('should not remove dots when !rd options is passed', function (assert) {
    const sanitized = SanitizationFilters.normalizeEmail('bar.sneaky@live.com', ['!rd'])
    assert.equal(sanitized, 'bar.sneaky@live.com')
  })

  test('should not remove dots when everything after + when !re options is passed', function (assert) {
    const sanitized = SanitizationFilters.normalizeEmail('bar.sneaky+foo@live.com', ['!re'])
    assert.equal(sanitized, 'barsneaky+foo@live.com')
  })

  test('should not remove dots when domain is hotmail', function (assert) {
    const sanitized = SanitizationFilters.normalizeEmail('bar.sneaky+foo@hotmail.com', [])
    assert.equal(sanitized, 'bar.sneaky@hotmail.com')
  })

  test('should make email lowercase when !lc is passed', function (assert) {
    const sanitized = SanitizationFilters.normalizeEmail('BAR.sneaky+foo@live.com', ['!lc'])
    assert.equal(sanitized, 'BARsneaky@live.com')
  })

  test('should make domain lowercase even if !lc is passed', function (assert) {
    const sanitized = SanitizationFilters.normalizeEmail('BAR.sneaky+foo@LIVE.com', ['!lc'])
    assert.equal(sanitized, 'BARsneaky@live.com')
  })

  test('should convert string false to boolean false', function (assert) {
    const sanitized = SanitizationFilters.toBoolean('false')
    assert.equal(sanitized, false)
  })

  test('should convert string 0 to boolean false', function (assert) {
    const sanitized = SanitizationFilters.toBoolean('0')
    assert.equal(sanitized, false)
  })

  test('should convert boolean false to boolean false', function (assert) {
    const sanitized = SanitizationFilters.toBoolean(false)
    assert.equal(sanitized, false)
  })

  test('should convert integer 0 to boolean false', function (assert) {
    const sanitized = SanitizationFilters.toBoolean(0)
    assert.equal(sanitized, false)
  })

  test('should convert empty string to boolean false', function (assert) {
    const sanitized = SanitizationFilters.toBoolean('')
    assert.equal(sanitized, false)
  })

  test('should convert any string to boolean true', function (assert) {
    const sanitized = SanitizationFilters.toBoolean('hello')
    assert.equal(sanitized, true)
  })

  test('should parse float a number', function (assert) {
    const sanitized = SanitizationFilters.toFloat('10')
    assert.equal(sanitized, 10)
  })

  test('should parse float a number with precision', function (assert) {
    const sanitized = SanitizationFilters.toFloat('10.23')
    assert.equal(sanitized, 10.23)
  })

  test('should return NaN when a string is passed', function (assert) {
    const sanitized = SanitizationFilters.toFloat('hello')
    assert.deepEqual(sanitized, NaN)
  })

  test('should return boolean to NaN', function (assert) {
    const sanitized = SanitizationFilters.toFloat(true)
    assert.deepEqual(sanitized, NaN)
  })

  test('should convert string representation of integer to integer', function (assert) {
    const sanitized = SanitizationFilters.toInt('20', [])
    assert.equal(sanitized, 20)
  })

  test('should convert string representation of float to integer', function (assert) {
    const sanitized = SanitizationFilters.toInt('20.40', [])
    assert.equal(sanitized, 20)
  })

  test('should convert boolean to NaN', function (assert) {
    const sanitized = SanitizationFilters.toInt(null, [])
    assert.deepEqual(sanitized, NaN)
  })

  test('should convert string to NaN', function (assert) {
    const sanitized = SanitizationFilters.toInt('hello', [])
    assert.deepEqual(sanitized, NaN)
  })

  test('should convert a date to date object', function (assert) {
    const sanitized = SanitizationFilters.toDate('2015-10-20')
    assert.deepEqual(sanitized, new Date('2015-10-20'))
  })

  test('should return null when is not a valid date', function (assert) {
    const sanitized = SanitizationFilters.toDate('hello')
    assert.equal(sanitized, null)
  })

  test('should remove letters listed in blacklist', function (assert) {
    const sanitized = SanitizationFilters.blacklist('hello world', ['ore'])
    assert.equal(sanitized, 'hll wld')
  })

  test('should return actual value when integer is passed', function (assert) {
    const sanitized = SanitizationFilters.blacklist(20, ['ore'])
    assert.equal(sanitized, 20)
  })

  test('should entertain regex keywords inside blacklist', function (assert) {
    const sanitized = SanitizationFilters.blacklist('hello.world', ['.\\[\\]'])
    assert.equal(sanitized, 'helloworld')
  })

  test('should strip links and return values inside it', function (assert) {
    const para = 'Click <a href="http://google.com"> here </a> to search'
    const sanitized = SanitizationFilters.stripLinks(para)
    assert.equal(sanitized, 'Click here to search')
  })

  test('should strip multiple links and return values inside it', function (assert) {
    const para = `Click <a href="http://google.com"> here </a> to search
    and visit <a href="http://adonisjs.com"> AdonisJs </a>`
    const sanitized = SanitizationFilters.stripLinks(para)
    assert.equal(sanitized.replace(/\n\s*/, ' '), 'Click here to search and visit AdonisJs')
  })

  test('should remove tags from a given string', function (assert) {
    const para = `Click <a href="http://google.com"> here </a> to search
    and visit <a href="http://adonisjs.com"> AdonisJs </a>`
    const sanitized = SanitizationFilters.stripTags(para, [])
    assert.equal(sanitized.replace(/\s+/g, ' ').trim(), 'Click here to search and visit AdonisJs')
  })

  test('should remove extra space after tags replace', function (assert) {
    const para = `Click <a href="http://google.com"> here </a> to search
    and visit <a href="http://adonisjs.com"> AdonisJs </a>`
    const sanitized = SanitizationFilters.stripTags(para, ['trim'])
    assert.equal(sanitized, 'Click here to search and visit AdonisJs')
  })

  test('should remove extra space after tags replace when in one line', function (assert) {
    const para = 'Click <a href="http://google.com"> here </a> to search and visit AdonisJs'
    const sanitized = SanitizationFilters.stripTags(para, ['trim'])
    assert.equal(sanitized, 'Click here to search and visit AdonisJs')
  })

  test('should actual value when value is not a string', function (assert) {
    const para = 11
    const sanitized = SanitizationFilters.stripTags(para, ['trim'])
    assert.equal(sanitized, para)
  })

  test('should pluralize a given string', function (assert) {
    const sanitized = SanitizationFilters.plural('person')
    assert.equal(sanitized, 'people')
  })

  test('should singularize a given string', function (assert) {
    const sanitized = SanitizationFilters.singular('people')
    assert.equal(sanitized, 'person')
  })

  test('should camelCase a given string', function (assert) {
    const sanitized = SanitizationFilters.camelCase('users_controller')
    assert.equal(sanitized, 'usersController')
  })

  test('should capitalize a given string', function (assert) {
    const sanitized = SanitizationFilters.capitalize('hello')
    assert.equal(sanitized, 'Hello')
  })

  test('should decapitalize a given string', function (assert) {
    const sanitized = SanitizationFilters.decapitalize('Hello')
    assert.equal(sanitized, 'hello')
  })

  test('should titleize a given string', function (assert) {
    const sanitized = SanitizationFilters.title('learn jquery in 30minutes')
    assert.equal(sanitized, 'Learn Jquery In 30 Minutes')
  })

  test('should convert a given string to underscore', function (assert) {
    const sanitized = SanitizationFilters.underscore('UsersController')
    assert.equal(sanitized, 'users_controller')
  })

  test('should convert a given string to dasherize', function (assert) {
    const sanitized = SanitizationFilters.toDash('puni_puni')
    assert.equal(sanitized, 'puni-puni')
  })

  test('should convert a value to a slug', function (assert) {
    const sanitized = SanitizationFilters.slug('learn jquery in 30minutes')
    assert.equal(sanitized, 'learn-jquery-in-30-minutes')
  })

  test('should convert a weired value to a slug', function (assert) {
    const sanitized = SanitizationFilters.slug('weird[case')
    assert.equal(sanitized, 'weird-case')
  })

  test('should convert a dot seperate value to a slug', function (assert) {
    const sanitized = SanitizationFilters.slug('dot.case')
    assert.equal(sanitized, 'dot-case')
  })

  test('should humanize a given value', function (assert) {
    const sanitized = SanitizationFilters.humanize('dot case')
    assert.equal(sanitized, 'Dot case')
  })
})

test.group('Sanitization', function () {
  test('should sanitize values using sanitize method', function (assert) {
    const data = {
      email: 'bar.sneaky@googlemail.com',
      body: '<p> Hello </p>'
    }

    const rules = {
      email: 'normalize_email',
      body: 'strip_tags'
    }

    const sanitized = Sanitization.sanitize(data, rules)
    assert.deepEqual(sanitized, {email: 'barsneaky@gmail.com', body: 'Hello'})
  })

  test('should sanitize nested values using sanitize method', function (assert) {
    const data = {
      profile: {
        email: 'bar.sneaky@googlemail.com'
      },
      body: '<p> Hello </p>'
    }

    const rules = {
      'profile.email': 'normalize_email',
      body: 'strip_tags'
    }

    const sanitized = Sanitization.sanitize(data, rules)
    assert.deepEqual(sanitized, {profile: {email: 'barsneaky@gmail.com'}, body: 'Hello'})
  })

  test('should run multiple sanizations on a given field', function (assert) {
    const data = {
      profile: {
        email: 'bar.sneaky@googlemail.com'
      },
      body: '<p> hello world </p>'
    }

    const rules = {
      'profile.email': 'normalize_email',
      body: 'strip_tags|slug'
    }

    const sanitized = Sanitization.sanitize(data, rules)
    assert.deepEqual(sanitized, {profile: {email: 'barsneaky@gmail.com'}, body: 'hello-world'})
  })

  test('should pass arguments to sanization methods', function (assert) {
    const data = {
      profile: {
        email: 'bar.sneaky@googlemail.com'
      },
      body: '<p> hello world </p>'
    }

    const rules = {
      'profile.email': 'normalize_email:!rd',
      body: 'strip_tags|slug'
    }

    const sanitized = Sanitization.sanitize(data, rules)
    assert.deepEqual(sanitized, {profile: {email: 'bar.sneaky@gmail.com'}, body: 'hello-world'})
  })

  test('should be able to sanitize values with array expressions', function (assert) {
    const data = {
      profile: [
        {
          email: 'bar.sneaky@googlemail.com'
        },
        {
          email: 'bar.foo@googlemail.com'
        }
      ]
    }

    const rules = {
      'profile.*.email': 'normalize_email'
    }

    const sanitized = Sanitization.sanitize(data, rules)
    assert.deepEqual(sanitized, {profile: [{email: 'barsneaky@gmail.com'}, {email: 'barfoo@gmail.com'}]})
  })

  test('should be able to sanitize values with flat array expressions', function (assert) {
    const data = {
      emails: ['bar.sneaky@googlemail.com', 'bar.foo@googlemail.com']
    }

    const rules = {
      'emails.*': 'normalize_email'
    }

    const sanitized = Sanitization.sanitize(data, rules)
    assert.deepEqual(sanitized, {emails: ['barsneaky@gmail.com', 'barfoo@gmail.com']})
  })

  test('should return the original data back when there are no matching filters found', function (assert) {
    const data = {
      email: 'bar.sneaky@googlemail.com',
      body: '<p>foo</p>'
    }

    const rules = {
    }

    const sanitized = Sanitization.sanitize(data, rules)
    assert.deepEqual(sanitized, data)
  })

  test('should not mutate the original data set', function (assert) {
    const data = {
      email: 'bar.sneaky@googlemail.com',
      body: '<p>foo</p>'
    }

    const rules = {
      email: 'normalize_email',
      body: 'strip_tags'
    }

    const sanitized = Sanitization.sanitize(data, rules)
    assert.deepEqual(data, data)
    assert.deepEqual(sanitized, {email: 'barsneaky@gmail.com', body: 'foo'})
  })

  test('should throw an error when sanization rule method is not found', function (assert) {
    const data = {
      profile: {
        email: 'bar.sneaky@googlemail.com'
      },
      body: '<p> hello world </p>'
    }

    const rules = {
      'profile.email': 'normalize_email:!rd|foo',
      body: 'strip_tags|slug'
    }

    const sanitized = function () {
      Sanitization.sanitize(data, rules)
    }
    assert.throw(sanitized, /foo is not defined/)
  })

  test('should be able to extend sanitizor', function (assert) {
    Sanitization.sanitizor.extend('upperCase', function (value) {
      return value.toUpperCase()
    })
    assert.equal(Sanitization.sanitizor.upperCase('foo'), 'FOO')
    const data = {
      name: 'doe'
    }
    const rules = {
      name: 'upper_case'
    }
    const sanitized = Sanitization.sanitize(data, rules)
    assert.deepEqual(sanitized, {name: 'DOE'})
  })

  test('throw exception when sanitizor.extend doesnt receives a method', function (assert) {
    const fn = () => Sanitization.sanitizor.extend('upperCase', 'foo')
    assert.throw(fn, 'Invalid arguments, sanitizor.extend expects 2nd parameter to be a function')
  })
})

test.group('Regression', function () {
  test('should work fine without optional 2nd argument', function (assert) {
    const sanitized = SanitizationFilters.toInt('20')
    assert.equal(sanitized, 20)
  })

  test('should remove tags without optional 2nd argument', function (assert) {
    const para = `Click <a href="http://google.com"> here </a> to search
    and visit <a href="http://adonisjs.com"> AdonisJs </a>`
    const sanitized = SanitizationFilters.stripTags(para)
    assert.equal(sanitized.replace(/\s+/g, ' ').trim(), 'Click here to search and visit AdonisJs')
  })

  test('sanization should return what\'s received', function (assert) {
    const data = {
      email: 'bar.sneaky@googlemail.com'
    }

    const rules = {
      'email': 'normalize_email:!rd',
      body: 'strip_tags|slug'
    }

    const sanitized = Sanitization.sanitize(data, rules)
    assert.deepEqual(sanitized, {
      email: 'bar.sneaky@gmail.com'
    })
  })
})
