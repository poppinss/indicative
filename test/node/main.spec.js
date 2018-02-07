'use strict'

/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import test from 'japa'
import indicative from '../../index'

test.group('Indicative', () => {
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

  test('export configure method and update defaults', async (assert) => {
    assert.plan(1)
    indicative.configure({
      EXISTY_STRICT: true
    })

    const data = {
      email: null
    }

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

    indicative.configure({
      EXISTY_STRICT: indicative.configure.DEFAULTS.EXISTY_STRICT
    })
  })

  test('add new validation rules', async (assert) => {
    assert.plan(1)
    indicative.validations.time = function () {
      return new Promise((resolve, reject) => {
        resolve('validation passed')
      })
    }

    const data = {
      call: '10:20'
    }

    const rules = {
      call: 'time'
    }

    const result = await indicative.validate(data, rules)
    assert.deepEqual(result, data)
  })

  test('add new sanitization rules', async (assert) => {
    assert.plan(1)
    indicative.sanitizor.stringToNull = function () {
      return null
    }

    const data = {
      username: ''
    }

    const rules = {
      username: 'string_to_null'
    }

    const result = indicative.sanitize(data, rules)
    assert.deepEqual(result, {
      username: null
    })
  })

  test('use jsonapi formatter', async (assert) => {
    assert.plan(1)

    const data = {}
    const rules = {
      username: 'required'
    }

    try {
      await indicative.validate(data, rules, null, indicative.formatters.JsonApi)
    } catch (errors) {
      assert.deepEqual(errors, {
        errors: [
          {
            title: 'required',
            source: { pointer: 'username' },
            detail: 'required validation failed on username'
          }
        ]
      })
    }
  })

  test('validate array expressions', async (assert) => {
    assert.plan(1)

    const data = {
      names: [22]
    }

    const rules = {
      'names.*': 'string'
    }

    try {
      await indicative.validate(data, rules, null)
    } catch (errors) {
      assert.deepEqual(errors, [
        {
          validation: 'string',
          field: 'names.0',
          message: 'string validation failed on names.0'
        }
      ])
    }
  })
})
