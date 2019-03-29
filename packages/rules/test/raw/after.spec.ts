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

test.group('raw | after', () => {
  test('return true when date is after defined date', (assert) => {
    assert.isTrue(Is.after('2010-10-10', '2010-10-09'))
    assert.isTrue(Is.after(new Date(), new Date().setDate(new Date().getDate() - 1)))
  })

  test('return false when date is not defined date', (assert) => {
    assert.isFalse(Is.after('2010-10-10', '2010-10-11'))
    assert.isFalse(Is.after(new Date(), new Date().setDate(new Date().getDate() + 1)))
  })
})
