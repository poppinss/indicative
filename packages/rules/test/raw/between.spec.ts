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

test.group('raw | between', () => {
  test('return true when input value is between comparison inputs', (assert) => {
    assert.isTrue(Is.between(30, 20, 40))
  })

  test('return false when input value is not between comparison inputs', (assert) => {
    assert.isFalse(Is.between(30, 35, 40))
  })
})
