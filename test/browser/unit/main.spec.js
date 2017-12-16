'use strict'

/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import indicative from '../../../'

group('Indicative', () => {
  test('should be able to call validate with inbuilt rules', async (assert) => {
    assert.plan(1)

    const data = {}
    const rules = {
      username: 'required'
    }

    try {
      await indicative.validate(data, rules)
    } catch (errors) {
      assert.deepEqual(errors, [
        {
          validation: 'required',
          field: 'username',
          message: 'required validation failed on username'
        }
      ])
    }
  })

  test('should be able to call validateAll with inbuilt rules', async (assert) => {
    assert.plan(1)

    const data = {}
    const rules = {
      username: 'required',
      email: 'required'
    }

    try {
      await indicative.validateAll(data, rules)
    } catch (errors) {
      assert.deepEqual(errors, [
        {
          validation: 'required',
          field: 'username',
          message: 'required validation failed on username'
        },
        {
          validation: 'required',
          field: 'email',
          message: 'required validation failed on email'
        }
      ])
    }
  })

  test('should be able to call raw validation methods', async (assert) => {
    assert.isTrue(indicative.is.existy('hello'))
  })

  test('should be able to use sanitize method', async (assert) => {
    const data = {
      email: 'foo+bar@gmail.com'
    }

    const rules = {
      email: 'normalize_email'
    }

    assert.deepEqual(indicative.sanitize(data, rules), {
      email: 'foo@gmail.com'
    })
  })

  test('should be able to call raw sanitization methods', async (assert) => {
    assert.equal(indicative.sanitizor.normalizeEmail('foo+bar@gmail.com'), 'foo@gmail.com')
  })

  test('should be able to call rule method', async (assert) => {
    assert.deepEqual(indicative.rule('foo', 1), {
      name: 'foo',
      args: [1]
    })
  })

  test('should be able to access formatters', async (assert) => {
    assert.property(indicative.formatters, 'Vanilla')
  })
})
