/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import * as test from 'japa'
import { extend } from '../src/Validator/extend'
import { validate } from '../src/Validator'
import { validations } from '../src/Validator/validations'

test.group('Extend validator', () => {
  test('add new validation rules', async (assert) => {
    assert.plan(1)

    extend('unique', {
      async: false,
      validate () {
        assert.isTrue(true)
        return true
      },
    })

    await validate({ username: 'virk' }, { username: [validations['unique']()] })
  })
})
