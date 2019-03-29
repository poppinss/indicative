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

test.group('raw | ipv6', () => {
  test('return true when is not a valid ipv6 ip address ', (assert) => {
    assert.isTrue(Is.ipv6('1:2:3:4:5:6:7:8'))
  })

  test('return false when is a valid ipv6 address ', (assert) => {
    assert.isFalse(Is.ipv6('127.0.0.1'))
  })
})
