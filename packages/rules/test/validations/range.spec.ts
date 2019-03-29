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
import * as validations from '../../src/validations'
import { RulesConfig } from '../../src/Contracts'

const config: RulesConfig = {
  existyStrict: true,
  castValues: true,
}

const root = { original: {} }

test.group('Validations | range', () => {

  test('throw exception when max value is not defined', async (assert) => {
    const args = [18]
    const fn = () => validations.range.compile!(args)
    assert.throw(fn, 'range:make sure to define min and max values')
  })

  test('throw exception when min value is null', async (assert) => {
    const args = [null, 60]
    const fn = () => validations.range.compile!(args)
    assert.throw(fn, 'range:min and max values must be defined as integers')
  })

  test('throw exception when max value is null', async (assert) => {
    const args = [60, null]
    const fn = () => validations.range.compile!(args)
    assert.throw(fn, 'range:min and max values must be defined as integers')
  })

  test('should not throw an error when min value is zero', async (assert) => {
    const args = [0, 60]
    const result = validations.range.compile!(args)
    assert.deepEqual(result, args)
  })

  test('return false when value of field is less then defined range', async (assert) => {
    const data = { age: 16 }
    const field = 'age'

    const args = [18, 60]
    assert.isFalse(validations.range.validate(data, field, args, 'literal', root, config))
  })

  test('return false when value of field is greater then defined range', async (assert) => {
    const data = { age: 61 }
    const field = 'age'

    const args = [18, 60]
    assert.isFalse(validations.range.validate(data, field, args, 'literal', root, config))
  })

  test('work fine when max value is zero', async (assert) => {
    const data = { temp: -5 }
    const field = 'temp'

    const args = [-10, 0]
    const result = validations.range.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('work fine when field value is under defined range', async (assert) => {
    const data = { age: 20 }
    const field = 'age'

    const args = [18, 60]
    const result = validations.range.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })
})
