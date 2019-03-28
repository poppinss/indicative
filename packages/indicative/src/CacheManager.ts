/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

export class CacheManager<CacheValue extends any> {
  private _cache: { [key: string]: CacheValue } = {}

  public get (key?: string): CacheValue | null {
    return key ? (this._cache[key] || null) : null
  }

  public set (value: CacheValue, key?: string): void {
    if (!key) {
      return
    }

    this._cache[key] = value
  }
}
