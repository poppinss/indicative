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

test.group('raw | before', () => {
  test('return true when date is before defined date', (assert) => {
    assert.isTrue(Is.before('2010-10-09', '2010-10-10'))
    assert.isTrue(Is.before(new Date(), new Date().setDate(new Date().getDate() + 1)))
  })

  test('return false when date is not defined date', (assert) => {
    assert.isFalse(Is.before('2010-10-11', '2010-10-10'))
    assert.isFalse(Is.before(new Date(), new Date().setDate(new Date().getDate() - 1)))
  })
})
