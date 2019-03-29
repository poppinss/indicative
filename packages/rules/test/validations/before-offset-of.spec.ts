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
import { subYears } from 'date-fns'
import * as validations from '../../src/validations'
import { RulesConfig } from '../../src/Contracts'

const config: RulesConfig = {
  existyStrict: true,
}

const root = { original: {} }

test.group('Validations | beforeOffsetOf', () => {
  test('throw exception when offset arguments are missing', async (assert) => {
    const args: any[] = []
    const fn = () => validations.beforeOffsetOf.compile!(args)
    assert.throw(fn, 'beforeOffsetOf:make sure to define offset unit and key')
  })

  test('throw exception when offset unit is missing', async (assert) => {
    const args: any[] = [10]
    const fn = () => validations.beforeOffsetOf.compile!(args)
    assert.throw(fn, 'beforeOffsetOf:make sure to define offset unit and key')
  })

  test('throw exception when offset unit is not a valid key', async (assert) => {
    const args: any[] = [12, 'foo']
    const fn = () => validations.beforeOffsetOf.compile!(args)
    assert.throw(fn, 'beforeOffsetOf:2nd argument must be a valid calc key')
  })

  test('return args when they are defined', async (assert) => {
    const args: any[] = ['20', 'days']
    assert.deepEqual(validations.beforeOffsetOf.compile!(args), [20, 'days'])
  })

  test('return false when date is not before defined offset', async (assert) => {
    const data = { subscription: new Date() }
    const field = 'subscription'

    const args = ['12', 'months']
    assert.isFalse(validations.beforeOffsetOf.validate(data, field, args, 'literal', root, config))
  })

  test('return false when value is not castable', async (assert) => {
    const data = {
      field1: {},
      field2: [],
      field3: 'hello',
    }
    const args = ['12', 'months']

    assert.isFalse(validations.beforeOffsetOf.validate(data, 'field1', args, 'literal', root, config))
    assert.isFalse(validations.beforeOffsetOf.validate(data, 'field2', args, 'literal', root, config))
    assert.isFalse(validations.beforeOffsetOf.validate(data, 'field3', args, 'literal', root, config))
  })

  test('work fine when value is before defined offset', async (assert) => {
    const data = { subscription: subYears(new Date(), 2) }
    const field = 'subscription'

    const args = ['12', 'months']
    const result = validations.beforeOffsetOf.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })
})
