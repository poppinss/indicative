'use strict'

/**
 * indicative
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

import * as sanitizations from '../../src/sanitizations'

group('Sanitizations | Normalize email', () => {
  test('normalize email by lowercasing the domain', (assert) => {
    assert.equal(sanitizations.normalizeEmail('foo@GMAIL.COM'), 'foo@gmail.com')
  })

  test('remove dots from gmail email address', (assert) => {
    assert.equal(sanitizations.normalizeEmail('john.doe@gmail.com'), 'johndoe@gmail.com')
  })

  test('should return original value email is incorrect', function (assert) {
    assert.equal(sanitizations.normalizeEmail(1111), 1111)
  })

  test('return email as it is when invalid', function (assert) {
    assert.equal(sanitizations.normalizeEmail('foo@bar.com'), 'foo@bar.com')
  })
})

group('Sanitizations | Strip tags', () => {
  test('should remove tags from a given string', function (assert) {
    const para = `Click <a href="http://google.com">here</a> to search and visit <a href="http://adonisjs.com">AdonisJs</a>`

    const sanitized = sanitizations.stripTags(para, [])
    assert.equal(sanitized, 'Click here to search and visit AdonisJs')
  })

  test('whitelist tags', function (assert) {
    const para = `Click <a href="http://google.com">here</a> to search and visit <a href="http://adonisjs.com">AdonisJs</a>`

    const sanitized = sanitizations.stripTags(para, ['a'])
    assert.equal(sanitized, 'Click <a href="http://google.com">here</a> to search and visit <a href="http://adonisjs.com">AdonisJs</a>')
  })

  test('should actual value when value is not a string', function (assert) {
    const para = 11
    const sanitized = sanitizations.stripTags(para)
    assert.equal(sanitized, para)
  })
})

group('Sanitizations | To Boolean', () => {
  test('should convert string false to boolean false', function (assert) {
    const sanitized = sanitizations.toBoolean('false')
    assert.equal(sanitized, false)
  })

  test('should convert string 0 to boolean false', function (assert) {
    const sanitized = sanitizations.toBoolean('0')
    assert.equal(sanitized, false)
  })

  test('should convert boolean false to boolean false', function (assert) {
    const sanitized = sanitizations.toBoolean(false)
    assert.equal(sanitized, false)
  })

  test('should convert integer 0 to boolean false', function (assert) {
    const sanitized = sanitizations.toBoolean(0)
    assert.equal(sanitized, false)
  })

  test('should convert empty string to boolean false', function (assert) {
    const sanitized = sanitizations.toBoolean('')
    assert.equal(sanitized, false)
  })

  test('should convert any string to boolean true', function (assert) {
    const sanitized = sanitizations.toBoolean('hello')
    assert.equal(sanitized, true)
  })
})

group('Sanitizations | To Int', () => {
  test('should convert string representation of integer to integer', function (assert) {
    const sanitized = sanitizations.toInt('20')
    assert.equal(sanitized, 20)
  })

  test('should convert string representation of float to integer', function (assert) {
    const sanitized = sanitizations.toInt('20.40')
    assert.equal(sanitized, 20)
  })

  test('should convert boolean to NaN', function (assert) {
    const sanitized = sanitizations.toInt(null)
    assert.deepEqual(sanitized, NaN)
  })

  test('should convert string to NaN', function (assert) {
    const sanitized = sanitizations.toInt('hello')
    assert.deepEqual(sanitized, NaN)
  })

  test('use different radix', function (assert) {
    const sanitized = sanitizations.toInt('10', [5])
    assert.deepEqual(sanitized, 5)
  })
})

group('Sanitizations | To Date', () => {
  test('should convert a date to date object', function (assert) {
    const sanitized = sanitizations.toDate('2015-10-20')
    assert.deepEqual(sanitized, new Date('2015-10-20'))
  })

  test('do not convert existing date objects', function (assert) {
    const date = new Date()
    const sanitized = sanitizations.toDate(date)
    assert.deepEqual(sanitized, date)
  })

  test('should return null when is not a valid date', function (assert) {
    const sanitized = sanitizations.toDate('hello')
    assert.equal(sanitized, null)
  })
})

group('Sanitizations | Plural', () => {
  test('should pluralize a given string', function (assert) {
    const sanitized = sanitizations.plural('person')
    assert.equal(sanitized, 'people')
  })

  test('return exact value when not a string', function (assert) {
    const sanitized = sanitizations.plural(null)
    assert.isNull(sanitized)
  })
})

group('Sanitizations | Singular', () => {
  test('should pluralize a given string', function (assert) {
    const sanitized = sanitizations.singular('people')
    assert.equal(sanitized, 'person')
  })

  test('return exact value when not a string', function (assert) {
    const sanitized = sanitizations.singular(null)
    assert.isNull(sanitized)
  })
})

group('Sanitizations | Slug', () => {
  test('should convert a value to a slug', function (assert) {
    const sanitized = sanitizations.slug('learn jquery in 30minutes')
    assert.equal(sanitized, 'learn-jquery-in-30-minutes')
  })

  test('should convert a weired value to a slug', function (assert) {
    const sanitized = sanitizations.slug('weird[case')
    assert.equal(sanitized, 'weird-case')
  })

  test('should convert a dot seperate value to a slug', function (assert) {
    const sanitized = sanitizations.slug('dot.case')
    assert.equal(sanitized, 'dot-case')
  })

  test('should convert a weird character to a slug', function (assert) {
    const sanitized = sanitizations.slug('tôi tên là đức tạ')
    assert.equal(sanitized, 'toi-ten-la-duc-ta')
  })

  test('return exact value when its a number', function (assert) {
    const sanitized = sanitizations.slug(12)
    assert.equal(sanitized, 12)
  })

  test('return exact value when value is null', function (assert) {
    const sanitized = sanitizations.slug(null)
    assert.isNull(sanitized)
  })
})

group('Sanitizations | toNull', () => {
  test('convert empty string to null', function (assert) {
    assert.isNull(sanitizations.toNull(''))
  })

  test('convert empty string with multiple spaces to null', function (assert) {
    assert.isNull(sanitizations.toNull('    '))
  })

  test('convert undefined to null', function (assert) {
    assert.isNull(sanitizations.toNull())
  })

  test('convert null to null', function (assert) {
    assert.isNull(sanitizations.toNull(null))
  })

  test('return original value when actual value is empty array', function (assert) {
    assert.isArray(sanitizations.toNull([]))
  })
})

group('Sanitizations | escape', () => {
  test('escape HTML string', (assert) => {
    assert.equal(sanitizations.escape('<div> hello </div>'), '&lt;div&gt; hello &lt;/div&gt;')
  })

  test('return same value when it\'s not a string', (assert) => {
    assert.equal(sanitizations.escape(22), 22)
  })
})

group('Sanitizations | stripLinks', () => {
  test('remove anchor tags from a string', (assert) => {
    assert.equal(sanitizations.stripLinks('<a href=""> google.com </a>'), 'google.com')
  })

  test('return same value when it\'s not a string', (assert) => {
    assert.equal(sanitizations.stripLinks(22), 22)
  })
})

group('Sanitizations | trim', () => {
  test('remove whitespace from both sides of a given string.', (assert) => {
    assert.equal(sanitizations.trim(' joe '), 'joe')
  })

  test('return same value when it\'s not a string', (assert) => {
    assert.equal(sanitizations.trim(22), 22)
  })
})
