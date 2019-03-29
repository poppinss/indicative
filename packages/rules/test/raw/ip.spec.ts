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

test.group('raw | ip', () => {
  test('return true when is a valid ip address ', (assert) => {
    assert.isTrue(Is.ip('127.0.0.1'))
  })

  test('return true when is a valid ipv6 ip address ', (assert) => {
    assert.isTrue(Is.ip('1:2:3:4:5:6:7:8'))
  })
})
