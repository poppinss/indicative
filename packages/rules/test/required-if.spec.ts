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

test.group('Validations | requiredIf', () => {
  test('throw exception when conditional field is not defined', async (assert) => {
    const args = []
    const fn = () => validations.requiredIf.compile!(args)
    assert.throw(fn, 'requiredIf:make sure to define target field')
  })

  test('return args as it is when validates successfully', async (assert) => {
    const args = ['password']
    assert.deepEqual(validations.requiredIf.compile!(args), args)
  })

  test('skip validation when conditional field does not exists', async (assert) => {
    const data = {}
    const field = 'password_confirm'

    const args = ['password']
    const result = validations.requiredIf.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('return false when conditional field exists and field under validation is missing', async (assert) => {
    const data = { password: 'foobar' }
    const field = 'password_confirm'

    const args = ['password']
    assert.isFalse(validations.requiredIf.validate(data, field, args, 'literal', root, config))
  })

  test('skip validation when conditional field is null', async (assert) => {
    const data = { password: null }
    const field = 'password_confirm'

    const args = ['password']
    const result = validations.requiredIf.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('work fine when field under validation is available', async (assert) => {
    const data = { password: 'foobar', 'password_confirm': 'foobar' }
    const field = 'password_confirm'

    const args = ['password']
    const result = validations.requiredIf.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })
})
