/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

/**
 * In memory cache manager for caching compiler output for a given
 * cache key
 */
export class CacheManager<CacheValue extends any> {
  private _cache: { [key: string]: CacheValue } = {}

  /**
   * Return value from the cache for the given key.
   */
  public get (key: string): CacheValue | null {
    return this._cache[key] || null
  }

  /**
   * Update cache value for the given key.
   */
  public set (key: string, value: CacheValue): void {
    this._cache[key] = value
  }
}
