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

test.group('Validations | startsWith', () => {
  test('throw exception when substring arg is not defined', async (assert) => {
    const args = []
    const fn = () => validations.startsWith.compile!(args)

    assert.throw(fn, 'startsWith:make sure to define substring')
  })

  test('returns args as it is when valid', async (assert) => {
    const args = ['D']
    assert.deepEqual(validations.startsWith.compile!(args), args)
  })

  test('return false when string does not startsWith defined substring', async (assert) => {
    const data = { username: 'foo' }
    const field = 'username'

    const args = ['D']
    assert.isFalse(validations.startsWith.validate(data, field, args, 'literal', root, config))
  })

  test('work fine when field value startsWith given string', async (assert) => {
    const data = { username: 'Doe' }
    const field = 'username'

    const args = ['D']
    const result = validations.startsWith.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })
})
