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

test.group('raw | same', () => {
  test('return true when 2 numeric values are same', (assert) => {
    assert.isTrue(Is.same(42, 40 + 2))
  })

  test('return true when 2 string values are same', (assert) => {
    assert.isTrue(Is.same('yeah', 'yeah'))
  })

  test('return true when 2 boolean values are same', (assert) => {
    assert.isTrue(Is.same(true, true))
  })
})
