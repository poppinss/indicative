/*
* indicative-compiler
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import * as test from 'japa'
import { sanitize } from '../src/Sanitizer'

test.group('sanitize', () => {
  test('run sanitizations on defined schema', (assert) => {
    const data = {
      username: '  virk',
      bio: 'This is <script>alert(\'me\')</script>',
    }

    sanitize(data, {
      username: 'trim',
      bio: 'stripTags',
    })

    assert.deepEqual(data, {
      username: 'virk',
      bio: 'This is alert(\'me\')',
    })
  })

  test('cache schema when cache key is defined', (assert) => {
    const data = {
      username: '  virk',
      bio: 'This is <script>alert(\'me\')</script>',
    }

    sanitize(data, {}, { cacheKey: 'foo' })
    assert.deepEqual(data, {
      username: '  virk',
      bio: 'This is <script>alert(\'me\')</script>',
    })

    sanitize(data, { username: 'trim', bio: 'stripTags' }, { cacheKey: 'foo' })
    assert.deepEqual(data, {
      username: '  virk',
      bio: 'This is <script>alert(\'me\')</script>',
    })
  })
})
