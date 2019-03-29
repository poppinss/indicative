/**
 * indicative-formatters
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { VanillaFormatter } from '../src/VanillaFormatter'
import * as test from 'japa'

test.group('Vanilla formatter', () => {
  test('add error message as a string', (assert) => {
    const formatter = new VanillaFormatter()
    formatter.addError('Invalid username', 'username', 'required')

    assert.deepEqual(formatter.toJSON(), [{
      error: 'Invalid username',
      field: 'username',
      validation: 'required',
    }])
  })

  test('add error object message as a string', (assert) => {
    const formatter = new VanillaFormatter()
    formatter.addError(new Error('Blow up'), 'username', 'required')

    assert.deepEqual(formatter.toJSON(), [{
      error: 'Blow up',
      field: 'username',
      validation: 'ENGINE_EXCEPTION',
    }])
  })

  test('return null when there are zero errors', (assert) => {
    const formatter = new VanillaFormatter()
    assert.isNull(formatter.toJSON())
  })
})
