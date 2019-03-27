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

test.group('Validations | ipv6', () => {
  test('return false when value is not a valid ipv6 address', async (assert) => {
    const data = { user_ip: '127.0.0.1' }
    const field = 'user_ip'

    const args: any[] = []
    assert.isFalse(validations.ipv6.validate(data, field, args, 'literal', root, config))
  })

  test('work fine when value is a valid ipv6 address', async (assert) => {
    const data = { user_ip: '2001:DB8:0:0:1::1' }
    const field = 'user_ip'

    const args: any[] = []
    const result = validations.ipv6.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('return false when value is not a valid string', async (assert) => {
    const data = { user_ip: 10 }
    const field = 'user_ip'

    const args: any[] = []
    assert.isFalse(validations.ipv6.validate(data, field, args, 'literal', root, config))
  })
})
