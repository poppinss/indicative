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
import { addMonths } from 'date-fns'
import * as validations from '../../src/validations'
import { RulesConfig } from '../../src/Contracts'

const config: RulesConfig = {
  existyStrict: true,
  castValues: true,
}

const root = { original: {} }

test.group('Validations | afterOffsetOf', () => {
  test('throw exception when offset arguments are missing', async (assert) => {
    const args: any[] = []
    const fn = () => validations.afterOffsetOf.compile!(args)
    assert.throw(fn, 'afterOffsetOf:make sure to define offset unit and key')
  })

  test('throw exception when offset unit is missing', async (assert) => {
    const args: any[] = [10]
    const fn = () => validations.afterOffsetOf.compile!(args)
    assert.throw(fn, 'afterOffsetOf:make sure to define offset unit and key')
  })

  test('throw exception when offset unit is not a valid key', async (assert) => {
    const args: any[] = [12, 'foo']
    const fn = () => validations.afterOffsetOf.compile!(args)
    assert.throw(fn, 'afterOffsetOf:2nd argument must be a valid calc key')
  })

  test('return args when they are defined', async (assert) => {
    const args: any[] = ['20', 'days']
    assert.deepEqual(validations.afterOffsetOf.compile!(args), [20, 'days'])
  })

  test('return false when date is not after defined offset', async (assert) => {
    const data = { renewal: new Date() }
    const field = 'renewal'
    const args = ['12', 'months']

    assert.isFalse(validations.afterOffsetOf.validate(data, field, args, 'literal', root, config))
  })

  test('return false when value is not castable', async (assert) => {
    const data = {
      field1: {},
      field2: [],
      field3: 10,
      field4: true,
      field5: 'hello',
    }
    const args = ['12', 'months']

    assert.isFalse(validations.afterOffsetOf.validate(data, 'field1', args, 'literal', root, config))
    assert.isFalse(validations.afterOffsetOf.validate(data, 'field2', args, 'literal', root, config))
    assert.isFalse(validations.afterOffsetOf.validate(data, 'field3', args, 'literal', root, config))
    assert.isFalse(validations.afterOffsetOf.validate(data, 'field4', args, 'literal', root, config))
    assert.isFalse(validations.afterOffsetOf.validate(data, 'field5', args, 'literal', root, config))
  })

  test('work fine when value is after defined offset', async (assert) => {
    const data = { renewal: addMonths(new Date(), 13) }
    const field = 'renewal'

    const args = ['12', 'months']
    const result = validations.afterOffsetOf.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })
})
