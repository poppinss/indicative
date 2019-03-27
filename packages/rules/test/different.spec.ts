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

test.group('Validations | different', () => {
  test('throw exception when comparison value is missing', async (assert) => {
    const args: any[] = []
    const fn = () => validations.different.compile!(args)
    assert.throw(fn, 'different:make sure to define target field for comparison')
  })

  test('return args as it is when valid', async (assert) => {
    const args: any[] = ['dob']
    assert.deepEqual(validations.different.compile!(args), args)
  })

  test('return false when value of targeted field is equal to defined field', async (assert) => {
    const data = { dob: '2011-20-10', enrollment_date: '2011-20-10' }
    const field = 'enrollment_date'

    const args = ['dob']
    assert.isFalse(validations.different.validate(data, field, args, 'literal', root, config))
  })

  test('skip validation when target field does not exists', async (assert) => {
    const data = {'enrollment_date': '2011-20-10'}
    const field = 'enrollment_date'

    const args = ['dob']
    const result = validations.different.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('work fine when value for both fields are different', async (assert) => {
    const data = { dob: '2011-20-10', 'enrollment_date': '2011-20-20' }
    const field = 'enrollment_date'

    const args = ['dob']
    const result = validations.different.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })
})
