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

test.group('raw | array', () => {
  test('return true when input is an array', (assert) => {
    assert.isTrue(Is.array(['22', '12']))
  })

  test('return false when input is an object', (assert) => {
    assert.isFalse(Is.array({age: 22}))
  })

  test('return false when input is a string', (assert) => {
    assert.isFalse(Is.array('input'))
  })
})
