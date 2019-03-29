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
}

const root = { original: {} }

test.group('Validations | integer', () => {
  test('work fine when string value can be casted to a string', async (assert) => {
    const data: { marks: any } = { marks: '10' }
    const field = 'marks'

    const args: any[] = []
    const result = validations.integer.validate(data, field, args, 'literal', root, config)

    assert.isTrue(result)
    assert.deepEqual(data, { marks: 10 })
  })

  test('return false when value is a float', async (assert) => {
    const data = { marks: 10.1 }
    const field = 'marks'

    const args: any[] = []

    assert.isFalse(validations.integer.validate(data, field, args, 'literal', root, config))
    assert.deepEqual(data, { marks: 10.1 })
  })

  test('work fine when value is an integer', async (assert) => {
    const data = { marks: 10 }
    const field = 'marks'

    const args: any[] = []
    const result = validations.integer.validate(data, field, args, 'literal', root, config)

    assert.isTrue(result)
    assert.deepEqual(data, { marks: 10 })
  })

  test('work fine when value is an integer with zero precision', async (assert) => {
    const data = { marks: 10.0 }
    const field = 'marks'

    const args: any[] = []
    const result = validations.integer.validate(data, field, args, 'literal', root, config)

    assert.isTrue(result)
    assert.deepEqual(data, { marks: 10 })
  })

  test('return false when field has a decimal value', async (assert) => {
    const data = { marks: 10.10 }
    const field = 'marks'

    const args: any[] = []
    const result = validations.integer.validate(data, field, args, 'literal', root, config)

    assert.isFalse(result)
    assert.deepEqual(data, { marks: 10.10 })
  })
})
