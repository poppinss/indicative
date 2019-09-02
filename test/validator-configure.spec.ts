/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import test from 'japa'
import { configure } from '../src/Validator/configure'
import { validate } from '../src/Validator'
import { ErrorFormatterContract } from 'indicative-compiler'

test.group('Configure validator', () => {
  test('configure validator to set custom formatter', async (assert) => {
    assert.plan(1)

    class MyFormatter implements ErrorFormatterContract {
      public errors: { message: string }[] = []
      public addError () {
        this.errors.push({ message: 'custom error message' })
      }

      public toJSON () {
        return this.errors
      }
    }

    configure({
      formatter: MyFormatter,
    })

    try {
      await validate({}, { username: 'required' })
    } catch (errors) {
      assert.deepEqual(errors, [{ message: 'custom error message' }])
    }

    configure(configure.DEFAULTS)
  })
})
