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

test.group('Validations | regex', () => {
  test('throw exception when regex pattern is missing', async (assert) => {
    const args = []
    const fn = () => validations.regex.compile!(args)
    assert.throw(fn, 'regex:make sure to define regex pattern')
  })

  test('compile regex string pattern to regex argument', async (assert) => {
    const args = ['[a-z]', 'i']
    const result = validations.regex.compile!(args)
    assert.deepEqual(result, [new RegExp(args[0], args[1])])
  })

  test('use regex pattern as it is', async (assert) => {
    const args = [/[a-z]/, 'i']
    const result = validations.regex.compile!(args)
    assert.deepEqual(result, [/[a-z]/])
  })

  test('return false when value does not match regex', async (assert) => {
    const data = { email: 'foo' }
    const field = 'email'

    const args = [/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/]
    assert.isFalse(validations.regex.validate(data, field, args, 'literal', root, config))
  })

  test('return true when value matches regex', async (assert) => {
    const data = { email: 'foo@gmail.com' }
    const field = 'email'

    const args = [/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/]
    assert.isTrue(validations.regex.validate(data, field, args, 'literal', root, config))
  })
})
