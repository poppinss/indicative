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

test.group('raw | odd', () => {
  test('return false when input is not a odd number', (assert) => {
    assert.isFalse(Is.odd(4))
  })

  test('return true when input is a odd number', (assert) => {
    assert.isTrue(Is.odd(5))
  })
})
