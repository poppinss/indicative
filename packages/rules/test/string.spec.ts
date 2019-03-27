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

test.group('Validations | string', () => {
  test('work fine when the confirmed field is string', async (assert) => {
    const data = { username: 'david' }
    const field = 'username'

    const args: any[] = []
    const result = validations.string.validate(data, field, args, 'literal', root, config)

    assert.isTrue(result)
    assert.deepEqual(data, { username: 'david' })
  })

  test('return true when the field value is a number', async (assert) => {
    const data: { username: any } = { username: 1234 }
    const field = 'username'

    const args: any[] = []

    assert.isTrue(validations.string.validate(data, field, args, 'literal', root, config))
    assert.deepEqual(data, { username: '1234' })
  })

  test('return true when the field value is a boolean', async (assert) => {
    const data: { username: any } = { username: true }
    const field = 'username'

    const args: any[] = []

    assert.isTrue(validations.string.validate(data, field, args, 'literal', root, config))
    assert.deepEqual(data, { username: 'true' })
  })

  test('return true when the field value is a date', async (assert) => {
    const date = new Date()
    const data: { username: any } = { username: date }
    const field = 'username'

    const args: any[] = []

    assert.isTrue(validations.string.validate(data, field, args, 'literal', root, config))
    assert.deepEqual(data, { username: date.toString() })
  })
})
