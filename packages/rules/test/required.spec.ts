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

test.group('Validations | required', () => {
  test('return false when field is not defined', async (assert) => {
    const data = {}
    const field = 'name'
    const args: any[] = []
    assert.isFalse(validations.required.validate(data, field, args, 'literal', root, config))
  })

  test('return false when field is defined but empty', async (assert) => {
    const data = { name: '' }
    const field = 'name'

    const args: any[] = []
    assert.isFalse(validations.required.validate(data, field, args, 'literal', root, config))
  })

  test('return true when field is defined and has value', async (assert) => {
    const data = { name: 'virk' }
    const field = 'name'

    const args: any[] = []
    const result = validations.required.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('return true when field is defined and has negative boolean value', async (assert) => {
    const data = { name: false }
    const field = 'name'

    const args: any[] = []
    const result = validations.required.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('return true when field is defined and has negative numeric value', async (assert) => {
    const data = { name: 0 }
    const field = 'name'

    const args: any[] = []
    const result = validations.required.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })
})
