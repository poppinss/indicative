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

test.group('raw | falsy', () => {
  test('return true when value is 0', (assert) => {
    assert.isTrue(Is.falsy(0))
  })

  test('return true when value is false', (assert) => {
    assert.isTrue(Is.falsy(false))
  })

  test('return false when value is a string', (assert) => {
    assert.isFalse(Is.falsy('false'))
  })

  test('return true when value is an empty string', (assert) => {
    assert.isTrue(Is.falsy(''))
  })
})
