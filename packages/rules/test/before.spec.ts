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

test.group('Validations | before', () => {
  test('throw exception when before value is missing', async (assert) => {
    const args: any[] = []
    const fn = () => validations.before.compile!(args)
    assert.throw(fn, 'before:make sure to define the before date')
  })

  test('throw exception when after value is defined as null', async (assert) => {
    const args: any[] = [null]
    const fn = () => validations.after.compile!(args)
    assert.throw(fn, 'after:after date must be defined as string or date object')
  })

  test('return args when before value is defined', async (assert) => {
    const args: any[] = ['2010-11-20']
    assert.deepEqual(validations.before.compile!(args), [new Date('2010-11-20')])
  })

  test('return false when date is not before defined date', async (assert) => {
    const data = { dob: '2012-11-20' }
    const field = 'dob'

    const args = ['2010-11-20']
    assert.isFalse(validations.before.validate(data, field, args, 'literal', root, config))
  })

  test('work fine when value is before defined date', async (assert) => {
    const data = { dob: '2010-01-01' }
    const field = 'dob'

    const args = ['2010-11-20']
    const result = validations.before.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('return false when value is not castable', async (assert) => {
    const data = {
      field1: {},
      field2: [],
      field3: 'hello',
    }

    const args = ['2010-11-20']

    assert.isFalse(validations.before.validate(data, 'field1', args, 'literal', root, config))
    assert.isFalse(validations.before.validate(data, 'field2', args, 'literal', root, config))
    assert.isFalse(validations.before.validate(data, 'field3', args, 'literal', root, config))
  })
})
