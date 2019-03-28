/*
* indicative-utils
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import * as test from 'japa'
import { ensureLength } from '../src/ensureLength'

test.group('ensureLength', () => {
  test('raise error when array length is less than desired length', (assert) => {
    const fn = () => ensureLength([], 'Must be 1', 1)
    assert.throw(fn, 'Must be 1')
  })

  test('work fine when array length is same as desired length', (assert) => {
    const fn = () => ensureLength(['hello'], 'Must be 1', 1)
    assert.doesNotThrow(fn, 'Must be 1')
  })

  test('work fine when array length is greater than desired length', (assert) => {
    const fn = () => ensureLength(['hello', 'hi'], 'Must be 1', 1)
    assert.doesNotThrow(fn, 'Must be 1')
  })
})
