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

test.group('Validations | notEquals', () => {
  test('throw erorr when comparison arg is missing', async (assert) => {
    const args = []
    const fn = () => validations.notEquals.compile!(args)
    assert.throw(fn, 'notEquals:make sure to define comparison value')
  })

  test('return args as it is when valid', async (assert) => {
    const args = ['bar']
    assert.deepEqual(validations.notEquals.compile!(args), args)
  })

  test('return false when value of targeted field is equal to defined value', async (assert) => {
    const data = { title: 'bar' }
    const field = 'title'

    const args = ['bar']
    assert.isFalse(validations.notEquals.validate(data, field, args, 'literal', root, config))
  })

  test('work fine when value for field does not matches to defined value', async (assert) => {
    const data = { title: 'foo' }
    const field = 'title'

    const args = ['bar']
    const result = validations.notEquals.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })
})
