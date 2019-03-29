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

test.group('raw | regex', () => {
  test('execute custom regex', (assert) => {
    assert.isTrue(Is.regex('virk', /[a-z]/))
  })

  test('throw exception when 2argument is not regex', (assert) => {
    const fn = () => (Is.regex as any)('virk', '[a-z]')
    assert.throw(fn, 'You must pass regex as the 2nd argument')
  })
})
