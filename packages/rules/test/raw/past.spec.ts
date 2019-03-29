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

test.group('raw | past', () => {
  test('return false when date is not in past', (assert) => {
    const isPast = Is.past('2200-11-05')
    assert.isFalse(isPast)
  })

  test('return true when date is in past', (assert) => {
    const isPast = Is.past('2001-11-01')
    assert.isTrue(isPast)
  })
})
