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

test.group('Validations | url', () => {
  test('return false when value is not a valid url', async (assert) => {
    const data = { github_profile: 'foo' }
    const field = 'github_profile'
    const args: any[] = []

    assert.isFalse(validations.url.validate(data, field, args, 'literal', root, config))
  })

  test('work fine when value is a valid url', async (assert) => {
    const data = { github_profile: 'http://github.com/thetutlage' }
    const field = 'github_profile'
    const args: any[] = []

    const result = validations.url.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('return false when value is a number', async (assert) => {
    const data = { github_profile: 10 }
    const field = 'github_profile'
    const args: any[] = []

    assert.isFalse(validations.url.validate(data, field, args, 'literal', root, config))
  })

  test('return false when value is a boolean', async (assert) => {
    const data = { github_profile: true }
    const field = 'github_profile'
    const args: any[] = []

    assert.isFalse(validations.url.validate(data, field, args, 'literal', root, config))
  })

  test('return false when value is a date', async (assert) => {
    const data = { github_profile: new Date() }
    const field = 'github_profile'
    const args: any[] = []

    assert.isFalse(validations.url.validate(data, field, args, 'literal', root, config))
  })
})
