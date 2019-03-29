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

test.group('raw | sameType', () => {
  test('return true when 2 inputs are of same type', (assert) => {
    assert.isTrue(Is.sameType(10, 10))
  })

  test('return true false when inputs are not of same type', (assert) => {
    assert.isFalse(Is.sameType('10', 10))
  })
})
