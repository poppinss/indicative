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
import * as Is from '../../src/raw'

test.group('raw | isString', () => {
  test('return true when input is a string', (assert) => {
    assert.isTrue(Is.isString('hello'))
  })

  test('return true when input is created using string class', (assert) => {
    assert.isTrue(Is.isString(String(10)))
  })

  test('return false when input is not a string', (assert) => {
    assert.isFalse(Is.isString(10))
  })
})
