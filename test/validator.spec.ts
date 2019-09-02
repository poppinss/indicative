/*
* indicative-compiler
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import test from 'japa'
import { validate, validateAll } from '../src/Validator'

test.group('validate', () => {
  test('run validations on defined schema', async (assert) => {
    assert.plan(1)

    try {
      await validate({}, { username: 'required', age: 'required' })
    } catch (errors) {
      assert.deepEqual(errors, [{
        message: 'required validation failed on username',
        validation: 'required',
        field: 'username',
      }])
    }
  })

  test('cache schema when cache key is defined', async () => {
    await validate({}, {}, {}, { cacheKey: 'foo' })
    await validate({}, { username: 'required' }, {}, { cacheKey: 'foo' })
  })
})

test.group('validateAll', () => {
  test('run all validations on defined schema', async (assert) => {
    assert.plan(1)

    try {
      await validateAll({}, { username: 'required', age: 'required' })
    } catch (errors) {
      assert.deepEqual(errors, [
        {
          message: 'required validation failed on username',
          validation: 'required',
          field: 'username',
        },
        {
          message: 'required validation failed on age',
          validation: 'required',
          field: 'age',
        },
      ])
    }
  })

  test('cache schema when cache key is defined', async () => {
    await validateAll({}, {}, {}, { cacheKey: 'foo' })
    await validateAll({}, { username: 'required' }, {}, { cacheKey: 'foo' })
  })
})
