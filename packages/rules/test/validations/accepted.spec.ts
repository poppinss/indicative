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

test.group('Validations | accepted', () => {
  test('should return false when field is defined but not accepted', async (assert) => {
    const data = { terms: false }
    const field = 'terms'

    const args: any[] = []
    assert.isFalse(validations.accepted.validate(data, field, args, 'literal', root, config))
  })

  test('work fine validation when field is defined and accepted using true', async (assert) => {
    const data = { terms: true }
    const field = 'terms'

    const args: any[] = []
    const result = validations.accepted.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('work fine validation when field is defined and accepted using string', async (assert) => {
    const data = { terms: 'okay' }
    const field = 'terms'

    const args: any[] = []
    const result = validations.accepted.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })
})
