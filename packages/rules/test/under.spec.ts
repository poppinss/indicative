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

test.group('Validations | under', () => {
  test('throw exception when under value is missing args', async (assert) => {
    const args = []
    const fn = () => validations.under.compile!(args)
    assert.throw(fn, 'under:make sure to define max value')
  })

  test('returns args as number when defined', async (assert) => {
    const args = ['10']
    assert.deepEqual(validations.under.compile!(args), [10])
  })

  test('return false when value of field is greater than defined value', async (assert) => {
    const data = { age: 11 }
    const field = 'age'
    const args = [10]

    assert.isFalse(validations.under.validate(data, field, args, 'literal', root, config))
  })

  test('return false when value of field is equal to the defined value', async (assert) => {
    const data = { age: 10 }
    const field = 'age'
    const args = [10]

    assert.isFalse(validations.under.validate(data, field, args, 'literal', root, config))
  })

  test('work fine when value of field is less than defined value', async (assert) => {
    const data = { age: 8 }
    const field = 'age'
    const args = [10]

    const result = validations.under.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })
})
