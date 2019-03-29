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

test.group('raw | existy', () => {
  test('return true when value exists but is an empty object', (assert) => {
    assert.isTrue(Is.existy({}))
  })

  test('return false when value is null', (assert) => {
    assert.isFalse(Is.existy(null))
  })

  test('return false when value is undefined', (assert) => {
    assert.isFalse(Is.existy(undefined))
  })

  test('return false when value is empty string', (assert) => {
    assert.isFalse(Is.existy(''))
  })
})
