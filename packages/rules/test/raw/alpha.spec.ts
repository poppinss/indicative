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

test.group('raw | alpha', () => {
  test('return true when value is alpha', (assert) => {
    assert.isTrue(Is.alpha('hello'))
  })

  test('return true when value is not alpha', (assert) => {
    assert.isFalse(Is.alpha('he1llo'))
  })
})
