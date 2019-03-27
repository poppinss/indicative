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

test.group('Validations | in', () => {
  test('throw exception when `in` collection is not defined', async (assert) => {
    const args = []
    const fn = () => validations.in.compile!(args)
    assert.throw(fn, 'in:make sure to define search collection')
  })

  test('returns args as it is when valid', async (assert) => {
    const args = ['foo', 'bar']
    assert.deepEqual(validations.in.compile!(args), args)
  })

  test('return false when field value is not in defined fields', async (assert) => {
    const data = { gender: 'Foo' }
    const field = 'gender'

    const args = ['F', 'M', 'O']
    assert.isFalse(validations.in.validate(data, field, args, 'literal', root, config))
  })

  test('work fine when value of field is under one of the defined values', async (assert) => {
    const data = { gender: 'F' }
    const field = 'gender'

    const args = ['F', 'M', 'O']
    const result = validations.in.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('work fine when expected values are integer', async (assert) => {
    const data = { marks: 10 }
    const field = 'marks'

    const args = [10, 20, 40]
    const result = validations.in.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })
})
