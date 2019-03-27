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

test.group('Validations | requiredWhen', () => {
  test('throw exception when conditional field is not defined', async (assert) => {
    const args = []
    const fn = () => validations.requiredWhen.compile!(args)
    assert.throw(fn, 'requiredWhen:make sure to define target field and it\'s expected value')
  })

  test('throw exception when conditional value is not defined', async (assert) => {
    const args = ['country']
    const fn = () => validations.requiredWhen.compile!(args)
    assert.throw(fn, 'requiredWhen:make sure to define target field and it\'s expected value')
  })

  test('return args as it is when validates successfully', async (assert) => {
    const args = ['country', 'US']
    assert.deepEqual(validations.requiredWhen.compile!(args), args)
  })

  test('skip validation when conditional field does not exists', async (assert) => {
    const data = {}
    const field = 'state'

    const args = ['country', 'US']
    const result = validations.requiredWhen.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('return false when conditional field value matches and field under validation is missing', async (assert) => {
    const data = { country: 'US' }
    const field = 'state'

    const args = ['country', 'US']
    assert.isFalse(validations.requiredWhen.validate(data, field, args, 'literal', root, config))
  })

  test('skip validation when value of conditional field does not match', async (assert) => {
    const data = { country: 'UK' }
    const field = 'state'

    const args = ['country', 'US']
    const result = validations.requiredWhen.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('skip validation when conditional field is null', async (assert) => {
    const data = { country: null }
    const field = 'state'

    const args = ['country', 'US']
    const result = validations.requiredWhen.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('work fine when validation field exists and conditional field value match', async (assert) => {
    const data = { country: 'US', state: 'NewYork' }
    const field = 'state'

    const args = ['country', 'US']
    const result = validations.requiredWhen.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('work fine when expected value is falsy and field value exists', async (assert) => {
    assert.plan(1)

    const data = { source: false, password: 'foo' }
    const field = 'password'

    const args = ['source', false]
    const result = validations.requiredWhen.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })
})
