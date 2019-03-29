/**
 * indicative
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import * as test from 'japa'
import { CacheManager } from '../src/CacheManager'

test.group('CacheManager', () => {
  test('get/set value from cache', (assert) => {
    const cache = new CacheManager<string>()
    cache.set('foo', 'hello')
    assert.equal(cache.get('foo'), 'hello')
  })
})
