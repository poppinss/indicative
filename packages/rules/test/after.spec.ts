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

test.group('Validations | after', () => {
  test('throw exception when after value is not defined', async (assert) => {
    const args: any[] = []
    const fn = () => validations.after.compile!(args)
    assert.throw(fn, 'after:make sure to define the after date')
  })

  test('throw exception when after value is defined as null', async (assert) => {
    const args: any[] = [null]
    const fn = () => validations.after.compile!(args)
    assert.throw(fn, 'after:after date must be defined as string or date object')
  })

  test('return args as date when is a valid date', async (assert) => {
    const args: any[] = ['2010-11-20']
    assert.deepEqual(validations.after.compile!(args), [new Date('2010-11-20')])
  })

  test('return false when date is not after defined date', async (assert) => {
    const data = { dob: '1980-11-20' }
    const field = 'dob'

    const args = ['2010-11-20']
    assert.isFalse(validations.after.validate(data, field, args, 'literal', root, config))
  })

  test('work fine when value is after defined date', async (assert) => {
    const data = { dob: '2011-01-01' }
    const field = 'dob'

    const args = ['2010-11-20']
    const result = validations.after.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('return false when value is not castable', async (assert) => {
    const data = {
      field1: {},
      field2: [],
      field3: 'hello',
      field4: 10,
      field5: true,
    }

    const args = ['2010-11-20']

    assert.isFalse(validations.after.validate(data, 'field1', args, 'literal', root, config))
    assert.isFalse(validations.after.validate(data, 'field2', args, 'literal', root, config))
    assert.isFalse(validations.after.validate(data, 'field3', args, 'literal', root, config))
    assert.isFalse(validations.after.validate(data, 'field4', args, 'literal', root, config))
    assert.isFalse(validations.after.validate(data, 'field5', args, 'literal', root, config))
  })
})
