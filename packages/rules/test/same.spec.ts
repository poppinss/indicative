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

test.group('Validations | same', () => {
  test('throw exception when comparison field is missing', async (assert) => {
    const args = []
    const fn = () => validations.same.compile!(args)
    assert.throw(fn, 'same:make sure to define target field for comparison')
  })

  test('return args as it is when valid', async (assert) => {
    const args = ['password']
    assert.deepEqual(validations.same.compile!(args), args)
  })

  test('return false when value of targeted field is not equal to defined field', async (assert) => {
    const data = { password: 'foo', 'password_confirm': 'bar' }
    const field = 'password_confirm'

    const args = ['password']
    assert.isFalse(validations.same.validate(data, field, args, 'literal', root, config))
  })

  test('skip validation when target field does not exists', async (assert) => {
    const data = {'password_confirm': 'bar'}
    const field = 'password_confirm'

    const args = ['password']
    const result = validations.same.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('skip validation when actual field does not exists', async (assert) => {
    const data = {}
    const field = 'password_confirm'

    const args = ['password']
    const result = validations.same.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('work fine when value for both field matches', async (assert) => {
    const data = { password: 'foo', password_confirm: 'foo' }
    const field = 'password_confirm'

    const args = ['password']
    const result = validations.same.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('skip validation when targeted field value exists but actual field does not exists', async (assert) => {
    const data = { password: 'foo' }
    const field = 'password_confirm'

    const args = ['password']
    const result = validations.same.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })
})
