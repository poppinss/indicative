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

test.group('Validations | json', () => {
  test('return false when value is not a valid json string', async (assert) => {
    const data = { profile: 'foo' }
    const field = 'profile'

    const args: any[] = []
    assert.isFalse(validations.json.validate(data, field, args, 'literal', root, config))
  })

  test('work fine when value is a valid json string', async (assert) => {
    const data = { profile: JSON.stringify({name: 'foo'}) }
    const field = 'profile'

    const args: any[] = []
    const result = validations.json.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('return false when value is a boolean', async (assert) => {
    const data = { profile: true }
    const field = 'profile'

    const args: any[] = []
    const result = validations.json.validate(data, field, args, 'literal', root, config)
    assert.isFalse(result)
  })

  test('return false when value is a number', async (assert) => {
    const data = { profile: 22 }
    const field = 'profile'

    const args: any[] = []
    const result = validations.json.validate(data, field, args, 'literal', root, config)
    assert.isFalse(result)
  })
})
