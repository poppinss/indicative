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

test.group('Validations | object', () => {
  test('return false when value is not a valid object', async (assert) => {
    const data = { profile: 'foo' }
    const field = 'profile'

    const args: any[] = []
    assert.isFalse(validations.object.validate(data, field, args, 'literal', root, config))
  })

  test('work fine when value is a valid object', async (assert) => {
    const data = { profile: { username: 'foo'} }
    const field = 'profile'

    const args: any[] = []
    const result = validations.object.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('return false when value of field is an array', async (assert) => {
    const data = { profile: ['username'] }
    const field = 'profile'
    const args: any[] = []

    assert.isFalse(validations.object.validate(data, field, args, 'literal', root, config))
  })
})
