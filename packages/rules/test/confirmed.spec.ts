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

test.group('Validations | confirmed', () => {
  test('work fine when the confirmed field is equal', async (assert) => {
    const data = { password: '1234', password_confirmation: '1234' }
    const field = 'password'

    const args: any[] = []
    const result = validations.confirmed.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('return false when then confirmed field isn\'t equal', async (assert) => {
    const data = { password: '1234', password_confirmation: '12345' }
    const field = 'password'

    const args: any[] = []
    assert.isFalse(validations.confirmed.validate(data, field, args, 'literal', root, config))
  })

  test('return false confirmed value is undefined', async (assert) => {
    const data = { password: '1234', password_confirmation: undefined }
    const field = 'password'

    const args: any[] = []
    assert.isFalse(validations.confirmed.validate(data, field, args, 'literal', root, config))
  })

  test('return true when data types are different', async (assert) => {
    const data = {
      password: '1234',
      password_confirmation: 1234,
      new_password: 1234,
      new_password_confirmation: '1234',
    }

    const args: any[] = []
    assert.isTrue(validations.confirmed.validate(data, 'password', args, 'literal', root, config))
    assert.isTrue(validations.confirmed.validate(data, 'new_password', args, 'literal', root, config))
  })
})
