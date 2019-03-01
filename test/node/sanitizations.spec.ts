/*
 * indicative
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

import * as test from 'japa'
import * as sanitizations from '../../src/sanitizations'

test.group('Sanitizations | Normalize email', () => {
  test('normalize email by lowercasing the domain', (assert) => {
    assert.equal(sanitizations.normalizeEmail('foo@GMAIL.COM'), 'foo@gmail.com')
  })

  test('remove dots from gmail email address', (assert) => {
    assert.equal(sanitizations.normalizeEmail('john.doe@gmail.com'), 'johndoe@gmail.com')
  })

  test('should return original value email is incorrect', (assert) => {
    assert.equal(sanitizations.normalizeEmail(1111), 1111)
  })

  test('return email as it is when invalid', (assert) => {
    assert.equal(sanitizations.normalizeEmail('foo@bar.com'), 'foo@bar.com')
  })
})

test.group('Sanitizations | Strip tags', () => {
  test('should remove tags from a given string', (assert) => {
    const para = [
      'Click <a href="http://google.com">here</a>',
      'to search and visit <a href="http://adonisjs.com">AdonisJs</a>',
    ].join(' ')

    const sanitized = sanitizations.stripTags(para, [])
    assert.equal(sanitized, 'Click here to search and visit AdonisJs')
  })

  test('whitelist tags', (assert) => {
    const para = [
      'Click <a href="http://google.com">here</a>',
      'to search and visit <a href="http://adonisjs.com">AdonisJs</a>',
    ].join(' ')

    const sanitized = sanitizations.stripTags(para, ['a'])
    assert.equal(sanitized, para)
  })

  test('should actual value when value is not a string', (assert) => {
    const para = 11
    const sanitized = sanitizations.stripTags(para)
    assert.equal(sanitized, para)
  })
})

test.group('Sanitizations | To Boolean', () => {
  test('should convert string false to boolean false', (assert) => {
    const sanitized = sanitizations.toBoolean('false')
    assert.equal(sanitized, false)
  })

  test('should convert string 0 to boolean false', (assert) => {
    const sanitized = sanitizations.toBoolean('0')
    assert.equal(sanitized, false)
  })

  test('should convert boolean false to boolean false', (assert) => {
    const sanitized = sanitizations.toBoolean(false)
    assert.equal(sanitized, false)
  })

  test('should convert integer 0 to boolean false', (assert) => {
    const sanitized = sanitizations.toBoolean(0)
    assert.equal(sanitized, false)
  })

  test('should convert empty string to boolean false', (assert) => {
    const sanitized = sanitizations.toBoolean('')
    assert.equal(sanitized, false)
  })

  test('should convert any string to boolean true', (assert) => {
    const sanitized = sanitizations.toBoolean('hello')
    assert.equal(sanitized, true)
  })
})

test.group('Sanitizations | To Int', () => {
  test('should convert string representation of integer to integer', (assert) => {
    const sanitized = sanitizations.toInt('20')
    assert.equal(sanitized, 20)
  })

  test('should convert string representation of float to integer', (assert) => {
    const sanitized = sanitizations.toInt('20.40')
    assert.equal(sanitized, 20)
  })

  test('should convert boolean to NaN', (assert) => {
    const sanitized = sanitizations.toInt(null)
    assert.deepEqual(sanitized, NaN)
  })

  test('should convert string to NaN', (assert) => {
    const sanitized = sanitizations.toInt('hello')
    assert.deepEqual(sanitized, NaN)
  })

  test('use different radix', (assert) => {
    const sanitized = sanitizations.toInt('10', [5])
    assert.deepEqual(sanitized, 5)
  })
})

test.group('Sanitizations | To Date', () => {
  test('should convert a date to date object', (assert) => {
    const sanitized = sanitizations.toDate('2015-10-20')
    assert.deepEqual(sanitized, new Date('2015-10-20'))
  })

  test('do not convert existing date objects', (assert) => {
    const date = new Date()
    const sanitized = sanitizations.toDate(date)
    assert.deepEqual(sanitized, date)
  })

  test('should return null when is not a valid date', (assert) => {
    const sanitized = sanitizations.toDate('hello')
    assert.equal(sanitized, null)
  })
})

test.group('Sanitizations | Plural', () => {
  test('should pluralize a given string', (assert) => {
    const sanitized = sanitizations.plural('person')
    assert.equal(sanitized, 'people')
  })

  test('return exact value when not a string', (assert) => {
    const sanitized = sanitizations.plural(null)
    assert.isNull(sanitized)
  })
})

test.group('Sanitizations | Singular', () => {
  test('should pluralize a given string', (assert) => {
    const sanitized = sanitizations.singular('people')
    assert.equal(sanitized, 'person')
  })

  test('return exact value when not a string', (assert) => {
    const sanitized = sanitizations.singular(null)
    assert.isNull(sanitized)
  })
})

test.group('Sanitizations | Slug', () => {
  test('should convert a value to a slug', (assert) => {
    const sanitized = sanitizations.slug('learn jquery in 30minutes')
    assert.equal(sanitized, 'learn-jquery-in-30-minutes')
  })

  test('should convert a weired value to a slug', (assert) => {
    const sanitized = sanitizations.slug('weird[case')
    assert.equal(sanitized, 'weird-case')
  })

  test('should convert a dot seperate value to a slug', (assert) => {
    const sanitized = sanitizations.slug('dot.case')
    assert.equal(sanitized, 'dot-case')
  })

  test('should convert a weird character to a slug', (assert) => {
    const sanitized = sanitizations.slug('tôi tên là đức tạ')
    assert.equal(sanitized, 'toi-ten-la-duc-ta')
  })

  test('return exact value when its a number', (assert) => {
    const sanitized = sanitizations.slug(12)
    assert.equal(sanitized, 12)
  })

  test('return exact value when value is null', (assert) => {
    const sanitized = sanitizations.slug(null)
    assert.isNull(sanitized)
  })
})

test.group('Sanitizations | toNull', () => {
  test('convert empty string to null', (assert) => {
    assert.isNull(sanitizations.toNull(''))
  })

  test('convert empty string with multiple spaces to null', (assert) => {
    assert.isNull(sanitizations.toNull('    '))
  })

  test('convert undefined to null', (assert) => {
    assert.isNull(sanitizations.toNull(undefined))
  })

  test('convert null to null', (assert) => {
    assert.isNull(sanitizations.toNull(null))
  })

  test('return original value when actual value is empty array', (assert) => {
    assert.isArray(sanitizations.toNull([]))
  })
})

test.group('Sanitizations | escape', () => {
  test('escape HTML string', (assert) => {
    assert.equal(sanitizations.escape('<div> hello </div>'), '&lt;div&gt; hello &lt;/div&gt;')
  })

  test('return same value when it\'s not a string', (assert) => {
    assert.equal(sanitizations.escape(22), 22)
  })
})

test.group('Sanitizations | stripLinks', () => {
  test('remove anchor tags from a string', (assert) => {
    assert.equal(sanitizations.stripLinks('<a href=""> google.com </a>'), 'google.com')
  })

  test('return same value when it\'s not a string', (assert) => {
    assert.equal(sanitizations.stripLinks(22), 22)
  })
})

test.group('Sanitizations | trim', () => {
  test('remove whitespace from both sides of a given string.', (assert) => {
    assert.equal(sanitizations.trim(' joe '), 'joe')
  })

  test('return same value when it\'s not a string', (assert) => {
    assert.equal(sanitizations.trim(22), 22)
  })
})

test.group('Sanitizations | lowerCase', () => {
  test('converts string to lower case', (assert) => {
    assert.equal(sanitizations.lowerCase('İstanbul'), 'i̇stanbul')
  })

  test('locale awareness', (assert) => {
    assert.equal(sanitizations.lowerCase('İstanbul', 'tr'), 'istanbul')
  })
})

test.group('Sanitizations | uppwerCase', () => {
  test('converts string to upper case', (assert) => {
    assert.equal(sanitizations.upperCase('istanbul'), 'ISTANBUL')
  })

  test('locale awareness', (assert) => {
    assert.equal(sanitizations.upperCase('istanbul', 'tr'), 'İSTANBUL')
  })
})
