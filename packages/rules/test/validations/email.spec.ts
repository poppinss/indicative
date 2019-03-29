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

test.group('Validations | email', () => {
  test('should return false when field is defined and does not have valid email', async (assert) => {
    const data = { email: 'virk' }
    const field = 'email'

    const args: any[] = []
    assert.isFalse(validations.email.validate(data, field, args, 'literal', root, config))
  })

  test('should return false when field is defined as negative boolean', async (assert) => {
    const data = { email: false }
    const field = 'email'

    const args: any[] = []
    assert.isFalse(validations.email.validate(data, field, args, 'literal', root, config))
  })

  test('should return false when field is defined as 0', async (assert) => {
    const data = { email: 0 }
    const field = 'email'

    const args: any[] = []
    assert.isFalse(validations.email.validate(data, field, args, 'literal', root, config))
  })

  test('work fine when valid email is provided', async (assert) => {
    const data = { email: 'foo@bar.com' }
    const field = 'email'

    const args: any[] = []
    const result = validations.email.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('work fine when valid email with extension is provided', async (assert) => {
    const data = { email: 'foo+baz@bar.com' }
    const field = 'email'

    const args: any[] = []
    const result = validations.email.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })
})
