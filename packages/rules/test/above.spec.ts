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

test.group('Validations | above', () => {
  test('throw exception when comparison value is not defined', async (assert) => {
    const args: any[] = []
    const fn = () => validations.above.compile!(args)
    assert.throw(fn, 'above:make sure to define minValue')
  })

  test('returns args as number when defined', async (assert) => {
    const args: any[] = ['22']
    assert.deepEqual(validations.above.compile!(args), [22])
  })

  test('return false when value of field is less than defined value', async (assert) => {
    const data = { age: 16 }
    const field = 'age'
    const args = [17]

    assert.isFalse(validations.above.validate(data, field, args, 'literal', root, config))
  })

  test('return false when value of field is equal to the defined value', async (assert) => {
    const data = { age: 17 }
    const field = 'age'
    const args = [17]

    assert.isFalse(validations.above.validate(data, field, args, 'literal', root, config))
  })

  test('work fine when value of field is greater than defined value', async (assert) => {
    const data = { age: 18 }
    const field = 'age'
    const args = [17]

    const result = validations.above.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })
})
