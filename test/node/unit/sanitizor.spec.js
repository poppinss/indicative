'use strict'

/**
 * indicative
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

import test from 'japa'
import sanitizor from '../../../src/core/sanitizor'
import * as sanizations from '../../../src/sanitizations'
import rule from '../../../src/core/rule'

test.group('Sanitizor', function () {
  test('should sanitize values using sanitize method', function (assert) {
    const data = {
      email: 'bar.sneaky@googlemail.com',
      body: '<p>Hello</p>'
    }

    const rules = {
      email: 'normalize_email',
      body: 'strip_tags'
    }

    const { sanitize } = sanitizor(sanizations)
    const sanitized = sanitize(data, rules)
    assert.deepEqual(sanitized, {email: 'barsneaky@gmail.com', body: 'Hello'})
  })

  test('should sanitize nested values using sanitize method', function (assert) {
    const data = {
      profile: {
        email: 'bar.sneaky@googlemail.com'
      },
      body: '<p>Hello</p>'
    }

    const rules = {
      'profile.email': 'normalize_email',
      body: 'strip_tags'
    }

    const { sanitize } = sanitizor(sanizations)
    const sanitized = sanitize(data, rules)
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

    const { sanitize } = sanitizor(sanizations)
    const sanitized = sanitize(data, rules)
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
      'profile.email': [
        rule('normalize_email', {
          gmail_remove_dots: false
        })
      ],
      body: 'strip_tags|slug'
    }

    const { sanitize } = sanitizor(sanizations)
    const sanitized = sanitize(data, rules)
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

    const { sanitize } = sanitizor(sanizations)
    const sanitized = sanitize(data, rules)
    assert.deepEqual(sanitized, {
      profile: [{ email: 'barsneaky@gmail.com' }, { email: 'barfoo@gmail.com' }]
    })
  })

  test('should be able to sanitize values with nested array expressions', function (assert) {
    const data = {
      users: [
        {
          email: 'bar.sneaky@googlemail.com',
          profiles: [
            {
              email: 'bar.foo@googlemail.com'
            }
          ]
        }
      ]
    }

    const rules = {
      'users.*.email': 'normalize_email',
      'users.*.profiles.*.email': 'normalize_email'
    }

    const { sanitize } = sanitizor(sanizations)
    const sanitized = sanitize(data, rules)
    assert.deepEqual(sanitized, {
      users: [
        {
          email: 'barsneaky@gmail.com',
          profiles: [
            {
              email: 'barfoo@gmail.com'
            }
          ]
        }
      ]
    })
  })

  test('should be able to sanitize values with flat array expressions', function (assert) {
    const data = {
      emails: ['bar.sneaky@googlemail.com', 'bar.foo@googlemail.com']
    }

    const rules = {
      'emails.*': 'normalize_email'
    }

    const { sanitize } = sanitizor(sanizations)
    const sanitized = sanitize(data, rules)
    assert.deepEqual(sanitized, {emails: ['barsneaky@gmail.com', 'barfoo@gmail.com']})
  })

  test('should return the original data back when there are no matching filters found', function (assert) {
    const data = {
      email: 'bar.sneaky@googlemail.com',
      body: '<p>foo</p>'
    }

    const rules = {
    }

    const { sanitize } = sanitizor(sanizations)
    const sanitized = sanitize(data, rules)
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

    const { sanitize } = sanitizor(sanizations)
    const sanitized = sanitize(data, rules)

    assert.deepEqual(data, {
      email: 'bar.sneaky@googlemail.com',
      body: '<p>foo</p>'
    })
    assert.deepEqual(sanitized, {email: 'barsneaky@gmail.com', body: 'foo'})
    assert.notDeepEqual(sanitized, data)
  })

  test('should throw an error when sanization rule method is not found', function (assert) {
    const data = {
      profile: {
        email: 'bar.sneaky@googlemail.com'
      },
      body: '<p> hello world </p>'
    }

    const rules = {
      'profile.email': 'normalize_email|foo',
      body: 'strip_tags|slug'
    }

    const { sanitize } = sanitizor(sanizations)
    const sanitized = () => sanitize(data, rules)
    assert.throw(sanitized, /foo is not a sanitization method/)
  })

  test('sanization should return what\'s received', function (assert) {
    const data = {
      email: 'bar.sneaky@googlemail.com'
    }

    const rules = {
      'email': 'normalize_email',
      body: 'strip_tags|slug'
    }

    const { sanitize } = sanitizor(sanizations)
    const sanitized = sanitize(data, rules)

    assert.deepEqual(sanitized, {
      email: 'barsneaky@gmail.com'
    })
  })

  test('camelcase rules names', function (assert) {
    const data = {
      email: 'bar.sneaky@googlemail.com'
    }

    const rules = {
      email: 'normalize_email'
    }

    const { sanitize } = sanitizor(sanizations)
    const sanitized = sanitize(data, rules)
    assert.deepEqual(sanitized, {email: 'barsneaky@gmail.com'})
  })
})
