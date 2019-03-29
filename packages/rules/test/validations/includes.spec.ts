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

test.group('Validations | includes', () => {
  test('throw exception when `includes` collection is missing', async (assert) => {
    const args = []
    const fn = () => validations.includes.compile!(args)
    assert.throw(fn, 'includes:make sure to define substring to match')
  })

  test('return args as it is when it is valid', async (assert) => {
    const args = ['app']
    assert.deepEqual(validations.includes.compile!(args), args)
  })

  test('return false when string does not include defined substring', async (assert) => {
    const data = { dpath: 'foo/bar' }
    const field = 'dpath'
    const args = ['app']

    assert.isFalse(validations.includes.validate(data, field, args, 'literal', root, config))
  })

  test('return false when string does not include defined substring', async (assert) => {
    const data = { dpath: 'foo/bar' }
    const field = 'dpath'
    const args = ['app']

    assert.isFalse(validations.includes.validate(data, field, args, 'literal', root, config))
  })

  test('work fine when field value includes given string', async (assert) => {
    const data = { dpath: '/app/bar' }
    const field = 'dpath'

    const args = ['app']
    const result = validations.includes.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })
})
