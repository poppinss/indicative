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

test.group('Validations | number', () => {
  test('work fine when the field value is a number (float)', async (assert) => {
    const data = { price: 12.01 }
    const field = 'price'

    const args: any[] = []
    const result = validations.number.validate(data, field, args, 'literal', root, config)

    assert.isTrue(result)
    assert.deepEqual(data, { price: 12.01 })
  })

  test('work fine when the field value is a number (integer)', async (assert) => {
    const data = { age: 47 }
    const field = 'age'

    const args: any[] = []
    const result = validations.number.validate(data, field, args, 'literal', root, config)

    assert.isTrue(result)
    assert.deepEqual(data, { age: 47 })
  })

  test('cast strings to numbers', async (assert) => {
    const data: { price: any } = { price: '10' }
    const field = 'price'

    const args: any[] = []
    const result = validations.number.validate(data, field, args, 'literal', root, config)

    assert.isTrue(result)
    assert.deepEqual(data, { price: 10 })
  })

  test('cast strings with decimal values to numbers', async (assert) => {
    const data: { price: any } = { price: '10.40' }
    const field = 'price'

    const args: any[] = []
    const result = validations.number.validate(data, field, args, 'literal', root, config)

    assert.isTrue(result)
    assert.deepEqual(data, { price: 10.40 })
  })

  test('return false when the field value is a string', async (assert) => {
    const data = { price: 'AnError' }
    const field = 'price'

    const args: any[] = []
    assert.isFalse(validations.number.validate(data, field, args, 'literal', root, config))
    assert.deepEqual(data, { price: 'AnError' })
  })

  test('return false when the field value is a negative number', async (assert) => {
    const data = { price: -10 }
    const field = 'price'

    const args: any[] = []
    assert.isFalse(validations.number.validate(data, field, args, 'literal', root, config))
    assert.deepEqual(data, { price: -10 })
  })

  test('return false when the field value is a boolean', async (assert) => {
    const data = { price: true }
    const field = 'price'

    const args: any[] = []
    assert.isFalse(validations.number.validate(data, field, args, 'literal', root, config))
    assert.deepEqual(data, { price: true })
  })
})
