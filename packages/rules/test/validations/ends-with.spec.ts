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

test.group('Validations | endsWith', () => {
  test('throw exception when substring is missing', async (assert) => {
    const args: any[] = []
    const fn = () => validations.endsWith.compile!(args)
    assert.throw(fn, 'endsWith:make sure to define substring')
  })

  test('return args as it is when valid', async (assert) => {
    const args: any[] = ['e']
    assert.deepEqual(validations.endsWith.compile!(args), args)
  })

  test('return false when string does not endsWith defined substring', async (assert) => {
    const data = { username: 'foo' }
    const field = 'username'

    const args = ['e']
    assert.isFalse(validations.endsWith.validate(data, field, args, 'literal', root, config))
  })

  test('work fine when field value endsWith given string', async (assert) => {
    const data = { username: 'Doe' }
    const field = 'username'

    const args = ['e']
    const result = validations.endsWith.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })
})
