/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import * as test from 'japa'
import { extend } from '../src/Sanitizer/extend'
import { sanitize } from '../src/Sanitizer'
import { sanitizations } from '../src/Sanitizer/sanitizations'

test.group('Extend sanitizer', () => {
  test('add new validation rules', (assert) => {
    assert.plan(1)

    extend('customTrim', {
      sanitize (data, field) {
        data.tip[field] = `${data.tip[field]}-sanitized`
      },
    })

    const data = sanitize({ username: 'virk' }, { username: [sanitizations['customTrim']()] })
    assert.deepEqual(data, { username: 'virk-sanitized' })
  })
})
