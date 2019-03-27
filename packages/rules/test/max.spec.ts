'use strict'

/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import * as test from 'japa'
import * as validations from '../src/validations'
import { RulesConfig } from '../src/Contracts'

const config: RulesConfig = {
  existyStrict: true,
  castValues: true,
}
const root = { original: {} }

test.group('Validations | max', () => {
  test('throw exception at compile time when max value is missing', async (assert) => {
    const args = []
    const fn = () => validations.max.compile!(args)
    assert.throw(fn, 'max: make sure to define max length')
  })

  test('throw exception at compile time when max value is not castable to number', async (assert) => {
    const args = ['foo']
    const fn = () => validations.max.compile!(args)
    assert.throw(fn, 'max: length must be defined as an integer')
  })

  test('throw exception at compile time when max value is null', async (assert) => {
    const args = [null]
    const fn = () => validations.max.compile!(args)
    assert.throw(fn, 'max: length must be defined as an integer')
  })

  test('cast max value to number when is defined in args', async (assert) => {
    const args = ['6']
    assert.deepEqual(validations.max.compile!(args), [6])
  })

  test('return false when length of field is greater than defined length', async (assert) => {
    const data = { password: 'foobarbaz' }
    const field = 'password'
    const args = [6]

    assert.isFalse(validations.max.validate(data, field, args, 'literal', root, config))
  })

  test('return false when value is not a string or array', async (assert) => {
    const data = {
      password: 1990909990,
      created_at: new Date(),
      options: {},
      is_admin: true,
    }
    const args = [6]

    assert.isFalse(validations.max.validate(data, 'password', args, 'literal', root, config))
    assert.isFalse(validations.max.validate(data, 'created_at', args, 'literal', root, config))
    assert.isFalse(validations.max.validate(data, 'options', args, 'literal', root, config))
    assert.isFalse(validations.max.validate(data, 'is_admin', args, 'literal', root, config))
  })

  test('skip validation when field is undefined', async (assert) => {
    const data = {}
    const field = 'password'
    const args = [6]

    const result = validations.max.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('skip validation when field value is explicit undefined', async (assert) => {
    const data = { password: undefined }
    const field = 'password'
    const args = [6]

    const result = validations.max.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('skip validation when field value is null is strict is false', async (assert) => {
    const data = { password: null }
    const field = 'password'
    const args = [6]

    const result = validations.max.validate(data, field, args, 'literal', root, { existyStrict: false })
    assert.isTrue(result)
  })

  test('return false when field value is null is strict is true', async (assert) => {
    const data = { password: null }
    const field = 'password'
    const args = [6]

    const result = validations.max.validate(data, field, args, 'literal', root, { existyStrict: true })
    assert.isFalse(result)
  })

  test('work fine when length of value of field is less than defined length', async (assert) => {
    const data = { password: 'foo' }
    const field = 'password'
    const args = [6]

    const result = validations.max.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('work fine when length of value of field is equal to the defined length', async (assert) => {
    const data = { password: 'foobar' }
    const field = 'password'
    const args = [6]

    const result = validations.max.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('return false when array length exceeds the max number', async (assert) => {
    const data = { users: ['virk', 'nikk', 'joe'] }
    const field = 'users'

    const args = [2]
    assert.isFalse(validations.max.validate(data, field, args, 'literal', root, config))
  })

  test('work fine when array length is within the max number', async (assert) => {
    const data = { users: ['virk', 'nikk'] }
    const field = 'users'

    const args = [2]
    const result = validations.max.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })
})
