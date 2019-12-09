/**
 * @module indicative
 */

/*
* indicative-compiler
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

/**
 * In memory cache manager to cache pre-compiled schemas when `cacheKey`
 * is defined.
 */
export class CacheManager<T extends any> {
  private cache: Map<string, T> = new Map()

  /**
   * Add to cache
   */
  public set (key: string, value: T): void {
    this.cache.set(key, value)
  }

  /**
   * Read from cache
   */
  public get (key: string): T | undefined {
    return this.cache.get(key)
  }
}
