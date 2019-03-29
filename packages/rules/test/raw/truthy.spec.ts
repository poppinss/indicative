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

test.group('raw | truthy', () => {
  test('return true when value is a positive boolean', (assert) => {
    assert.isTrue(Is.truthy(true))
  })

  test('return true when value is a string', (assert) => {
    assert.isTrue(Is.truthy('true'))
  })

  test('return false when value is false', (assert) => {
    assert.isFalse(Is.truthy(false))
  })

  test('return false when value is 0', (assert) => {
    assert.isFalse(Is.truthy(0))
  })
})
