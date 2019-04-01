/**
 * indicative
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import * as test from 'japa'
import { configure, validate, extend } from '../index'
import { config } from '../src/config'

test.group('configure', () => {
  test('update global config options using configure', (assert) => {
    assert.isTrue(config.existyStrict)
    configure({ existyStrict: false })

    assert.isFalse(config.existyStrict)
    assert.isTrue(configure.DEFAULTS.existyStrict)
  })
})

test.group('extend', () => {
  test('extend validations object', async (assert) => {
    assert.plan(1)
    extend('phone', {
      async: false,
      validate () {
        return false
      },
    })

    const data = {}
    const rules = {
      username: 'phone',
    }

    try {
      await validate(data, rules, {})
    } catch (errors) {
      assert.deepEqual(errors, [{
        error: 'phone validation failed on username',
        field: 'username',
        validation: 'phone',
      }])
    }
  })
})
