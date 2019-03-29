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

test.group('Validations | alphaNumeric', () => {
  test('return false when value is not alpha numeric', async (assert) => {
    const data = { username: 'virk@123' }
    const field = 'username'
    const args: any[] = []

    assert.isFalse(validations.alphaNumeric.validate(data, field, args, 'literal', root, config))
  })

  test('return false when value is a number', async (assert) => {
    const data = { username: 123 }
    const field = 'username'
    const args: any[] = []

    assert.isFalse(validations.alphaNumeric.validate(data, field, args, 'literal', root, config))
  })

  test('work fine when value is a valid alpha numeric', async (assert) => {
    const data = { username: 'virk123' }
    const field = 'username'

    const args: any[] = []
    const result = validations.alphaNumeric.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })
})
