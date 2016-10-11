'use strict'

/**
 * indicative
 * Copyright(c) 2016-2016 Harminder Virk
 * MIT Licensed
*/

const SanitizationFilters = require('../src/Sanitization/filters')
const Sanitization = require('../src/Sanitization')
const chai = require('chai')
const expect = chai.expect

describe('SanitizationFilters', function () {
  it('should escape html div using escape method', function () {
    const sanitized = SanitizationFilters.escape('<div id="foo"> hello </div>')
    expect(sanitized).to.equal('&lt;div id=&quot;foo&quot;&gt; hello &lt;&#x2F;div&gt;')
  })

  it('should escape & symbol', function () {
    const sanitized = SanitizationFilters.escape('Hello & hi')
    expect(sanitized).to.equal('Hello &amp; hi')
  })

  it('should return actual value when value is not string', function () {
    const sanitized = SanitizationFilters.escape({name: 'foo'})
    expect(sanitized).deep.equal({name: 'foo'})
  })

  it('should accept the first arguement only', function () {
    const sanitized = SanitizationFilters.normalizeEmail('bar.sneaky@gmail.com')
    expect(sanitized).to.equal('barsneaky@gmail.com')
  })

  it('should remove dots from an email', function () {
    const sanitized = SanitizationFilters.normalizeEmail('bar.sneaky@gmail.com', [])
    expect(sanitized).to.equal('barsneaky@gmail.com')
  })

  it('should remove everything after + from an email address', function () {
    const sanitized = SanitizationFilters.normalizeEmail('bar.sneaky+foo@gmail.com', [])
    expect(sanitized).to.equal('barsneaky@gmail.com')
  })

  it('should convert email to lowercase', function () {
    const sanitized = SanitizationFilters.normalizeEmail('BAR.sneaky+foo@GMAIL.com', [])
    expect(sanitized).to.equal('barsneaky@gmail.com')
  })

  it('should convert googlemail.com to gmail.com', function () {
    const sanitized = SanitizationFilters.normalizeEmail('BAR.sneaky+foo@googlemail.com', [])
    expect(sanitized).to.equal('barsneaky@gmail.com')
  })

  it('should convert googlemail.com to gmail.com', function () {
    const sanitized = SanitizationFilters.normalizeEmail('BAR.sneaky+foo@googlemail.com', [])
    expect(sanitized).to.equal('barsneaky@gmail.com')
  })

  it('should return original value when integer is passed', function () {
    const sanitized = SanitizationFilters.normalizeEmail(1111, [])
    expect(sanitized).to.equal(1111)
  })

  it('should return original when email like pattern is not passed', function () {
    const sanitized = SanitizationFilters.normalizeEmail('hello.world', [])
    expect(sanitized).to.equal('hello.world')
  })

  it('should not remove dots when !rd options is passed', function () {
    const sanitized = SanitizationFilters.normalizeEmail('bar.sneaky@live.com', ['!rd'])
    expect(sanitized).to.equal('bar.sneaky@live.com')
  })

  it('should not remove dots when everything after + when !re options is passed', function () {
    const sanitized = SanitizationFilters.normalizeEmail('bar.sneaky+foo@live.com', ['!re'])
    expect(sanitized).to.equal('barsneaky+foo@live.com')
  })

  it('should not remove dots when domain is hotmail', function () {
    const sanitized = SanitizationFilters.normalizeEmail('bar.sneaky+foo@hotmail.com', [])
    expect(sanitized).to.equal('bar.sneaky@hotmail.com')
  })

  it('should make email lowercase when !lc is passed', function () {
    const sanitized = SanitizationFilters.normalizeEmail('BAR.sneaky+foo@live.com', ['!lc'])
    expect(sanitized).to.equal('BARsneaky@live.com')
  })

  it('should make domain lowercase even if !lc is passed', function () {
    const sanitized = SanitizationFilters.normalizeEmail('BAR.sneaky+foo@LIVE.com', ['!lc'])
    expect(sanitized).to.equal('BARsneaky@live.com')
  })

  it('should convert string false to boolean false', function () {
    const sanitized = SanitizationFilters.toBoolean('false')
    expect(sanitized).to.equal(false)
  })

  it('should convert string 0 to boolean false', function () {
    const sanitized = SanitizationFilters.toBoolean('0')
    expect(sanitized).to.equal(false)
  })

  it('should convert boolean false to boolean false', function () {
    const sanitized = SanitizationFilters.toBoolean(false)
    expect(sanitized).to.equal(false)
  })

  it('should convert integer 0 to boolean false', function () {
    const sanitized = SanitizationFilters.toBoolean(0)
    expect(sanitized).to.equal(false)
  })

  it('should convert empty string to boolean false', function () {
    const sanitized = SanitizationFilters.toBoolean('')
    expect(sanitized).to.equal(false)
  })

  it('should convert any string to boolean true', function () {
    const sanitized = SanitizationFilters.toBoolean('hello')
    expect(sanitized).to.equal(true)
  })

  it('should parse float a number', function () {
    const sanitized = SanitizationFilters.toFloat('10')
    expect(sanitized).to.equal(10)
  })

  it('should parse float a number with precision', function () {
    const sanitized = SanitizationFilters.toFloat('10.23')
    expect(sanitized).to.equal(10.23)
  })

  it('should return NaN when a string is passed', function () {
    const sanitized = SanitizationFilters.toFloat('hello')
    expect(sanitized).deep.equal(NaN)
  })

  it('should return boolean to NaN', function () {
    const sanitized = SanitizationFilters.toFloat(true)
    expect(sanitized).deep.equal(NaN)
  })

  it('should convert string representation of integer to integer', function () {
    const sanitized = SanitizationFilters.toInt('20', [])
    expect(sanitized).to.equal(20)
  })

  it('should convert string representation of float to integer', function () {
    const sanitized = SanitizationFilters.toInt('20.40', [])
    expect(sanitized).to.equal(20)
  })

  it('should convert boolean to NaN', function () {
    const sanitized = SanitizationFilters.toInt(null, [])
    expect(sanitized).deep.equal(NaN)
  })

  it('should convert string to NaN', function () {
    const sanitized = SanitizationFilters.toInt('hello', [])
    expect(sanitized).deep.equal(NaN)
  })

  it('should convert a date to date object', function () {
    const sanitized = SanitizationFilters.toDate('2015-10-20')
    expect(sanitized).deep.equal(new Date('2015-10-20'))
  })

  it('should return null when is not a valid date', function () {
    const sanitized = SanitizationFilters.toDate('hello')
    expect(sanitized).to.equal(null)
  })

  it('should remove letters listed in blacklist', function () {
    const sanitized = SanitizationFilters.blacklist('hello world', ['ore'])
    expect(sanitized).to.equal('hll wld')
  })

  it('should return actual value when integer is passed', function () {
    const sanitized = SanitizationFilters.blacklist(20, ['ore'])
    expect(sanitized).to.equal(20)
  })

  it('should entertain regex keywords inside blacklist', function () {
    const sanitized = SanitizationFilters.blacklist('hello.world', ['.\\[\\]'])
    expect(sanitized).to.equal('helloworld')
  })

  it('should strip links and return values inside it', function () {
    const para = 'Click <a href="http://google.com"> here </a> to search'
    const sanitized = SanitizationFilters.stripLinks(para)
    expect(sanitized).to.equal('Click here to search')
  })

  it('should strip multiple links and return values inside it', function () {
    const para = `Click <a href="http://google.com"> here </a> to search
    and visit <a href="http://adonisjs.com"> AdonisJs </a>`
    const sanitized = SanitizationFilters.stripLinks(para)
    expect(sanitized.replace(/\n\s*/, ' ')).to.equal('Click here to search and visit AdonisJs')
  })

  it('should remove tags from a given string', function () {
    const para = `Click <a href="http://google.com"> here </a> to search
    and visit <a href="http://adonisjs.com"> AdonisJs </a>`
    const sanitized = SanitizationFilters.stripTags(para, [])
    expect(sanitized.replace(/\s+/g, ' ').trim()).to.equal('Click here to search and visit AdonisJs')
  })

  it('should remove extra space after tags replace', function () {
    const para = `Click <a href="http://google.com"> here </a> to search
    and visit <a href="http://adonisjs.com"> AdonisJs </a>`
    const sanitized = SanitizationFilters.stripTags(para, ['trim'])
    expect(sanitized).to.equal('Click here to search and visit AdonisJs')
  })

  it('should remove extra space after tags replace when in one line', function () {
    const para = 'Click <a href="http://google.com"> here </a> to search and visit AdonisJs'
    const sanitized = SanitizationFilters.stripTags(para, ['trim'])
    expect(sanitized).to.equal('Click here to search and visit AdonisJs')
  })

  it('should actual value when value is not a string', function () {
    const para = 11
    const sanitized = SanitizationFilters.stripTags(para, ['trim'])
    expect(sanitized).to.equal(para)
  })

  it('should pluralize a given string', function () {
    const sanitized = SanitizationFilters.plural('person')
    expect(sanitized).to.equal('people')
  })

  it('should singularize a given string', function () {
    const sanitized = SanitizationFilters.singular('people')
    expect(sanitized).to.equal('person')
  })

  it('should camelize a given string', function () {
    const sanitized = SanitizationFilters.camelCase('users_controller')
    expect(sanitized).to.equal('UsersController')
  })

  it('should capitalize a given string', function () {
    const sanitized = SanitizationFilters.capitalize('hello')
    expect(sanitized).to.equal('Hello')
  })

  it('should decapitalize a given string', function () {
    const sanitized = SanitizationFilters.decapitalize('Hello')
    expect(sanitized).to.equal('hello')
  })

  it('should titleize a given string', function () {
    const sanitized = SanitizationFilters.title('learn jquery in 30minutes')
    expect(sanitized).to.equal('Learn Jquery In 30minutes')
  })

  it('should convert a given string to underscore', function () {
    const sanitized = SanitizationFilters.underscore('UsersController')
    expect(sanitized).to.equal('users_controller')
  })

  it('should convert a given string to dasherize', function () {
    const sanitized = SanitizationFilters.toDash('puni_puni')
    expect(sanitized).to.equal('puni-puni')
  })

  it('should convert a value to a slug', function () {
    const sanitized = SanitizationFilters.slug('learn jquery in 30minutes')
    expect(sanitized).to.equal('learn-jquery-in-30minutes')
  })

  it('should convert a weired value to a slug', function () {
    const sanitized = SanitizationFilters.slug('weird[case')
    expect(sanitized).to.equal('weird-case')
  })

  it('should convert a dot seperate value to a slug', function () {
    const sanitized = SanitizationFilters.slug('dot.case')
    expect(sanitized).to.equal('dot-case')
  })

  it('should humanize a given value', function () {
    const sanitized = SanitizationFilters.humanize('dot case')
    expect(sanitized).to.equal('Dot case')
  })
})

describe('Sanitization', function () {
  it('should sanitize values using sanitize method', function () {
    const data = {
      email: 'bar.sneaky@googlemail.com',
      body: '<p> Hello </p>'
    }

    const rules = {
      email: 'normalize_email',
      body: 'strip_tags'
    }

    const sanitized = Sanitization.sanitize(data, rules)
    expect(sanitized).deep.equal({email: 'barsneaky@gmail.com', body: 'Hello'})
  })

  it('should sanitize nested values using sanitize method', function () {
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
    expect(sanitized).deep.equal({profile: {email: 'barsneaky@gmail.com'}, body: 'Hello'})
  })

  it('should run multiple sanizations on a given field', function () {
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
    expect(sanitized).deep.equal({profile: {email: 'barsneaky@gmail.com'}, body: 'hello-world'})
  })

  it('should pass arguments to sanization methods', function () {
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
    expect(sanitized).deep.equal({profile: {email: 'bar.sneaky@gmail.com'}, body: 'hello-world'})
  })

  it('should be able to sanitize values with array expressions', function () {
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
    expect(sanitized).deep.equal({profile: [{email: 'barsneaky@gmail.com'}, {email: 'barfoo@gmail.com'}]})
  })

  it('should be able to sanitize values with flat array expressions', function () {
    const data = {
      emails: ['bar.sneaky@googlemail.com', 'bar.foo@googlemail.com']
    }

    const rules = {
      'emails.*': 'normalize_email'
    }

    const sanitized = Sanitization.sanitize(data, rules)
    expect(sanitized).deep.equal({emails: ['barsneaky@gmail.com', 'barfoo@gmail.com']})
  })

  it('should return the original data back when there are no matching filters found', function () {
    const data = {
      email: 'bar.sneaky@googlemail.com',
      body: '<p>foo</p>'
    }

    const rules = {
    }

    const sanitized = Sanitization.sanitize(data, rules)
    expect(sanitized).deep.equal(data)
  })

  it('should not mutate the original data set', function () {
    const data = {
      email: 'bar.sneaky@googlemail.com',
      body: '<p>foo</p>'
    }

    const rules = {
      email: 'normalize_email',
      body: 'strip_tags'
    }

    const sanitized = Sanitization.sanitize(data, rules)
    expect(data).deep.equal(data)
    expect(sanitized).deep.equal({email: 'barsneaky@gmail.com', body: 'foo'})
  })

  it('should throw an error when sanization rule method is not found', function () {
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
    expect(sanitized).to.throw(/foo is not defined/)
  })

  it('should be able to extend sanitizor', function () {
    Sanitization.sanitizor.extend('upperCase', function (value) {
      return value.toUpperCase()
    })
    expect(Sanitization.sanitizor.upperCase('foo')).to.equal('FOO')
    const data = {
      name: 'doe'
    }
    const rules = {
      name: 'upper_case'
    }
    const sanitized = Sanitization.sanitize(data, rules)
    expect(sanitized).deep.equal({name: 'DOE'})
  })
})
