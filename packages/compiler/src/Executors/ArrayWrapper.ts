/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { ExecutorFn, IndicativeFormatter, DataNode, DataRoot } from '../Contracts'
import { dotProp } from '../utils'

/**
 * Array executor wraps an array of child executors to be
 * executed as per the length of the array at runtime.
 */
export class ArrayWrapper {
  private _dotPathLength = this._dotPath.length

  constructor (
    private _executors: ExecutorFn[],
    private _dotPath: string[],
    private _index: string,
  ) {}

  /**
   * Returns data node for the array path inside the actual data
   * node
   */
  private _getData (data: DataNode): any[] | null {
    /**
     * Tip is the array inside the actual user data
     * for which validations must run
     */
    const arrayNode = dotProp(data, this._dotPath, this._dotPathLength)

    /**
     * If tip is not an array, then there is no point running any validations. User can validate
     * the tip seperately with `required|array` validation.
     */
    if (!Array.isArray(arrayNode)) {
      return null
    }

    return arrayNode
  }

  /**
   * Returns an array of items to loop on. If explicit index is defined
   * then only that index value is returned by wrapped inside an array
   * for consistent output
   */
  private _getLoopItems (arrayNode: any[] | null): any[] | null {
    if (!arrayNode) {
      return null
    }

    if (this._index === '*') {
      return arrayNode
    }

    return arrayNode[this._index] ? [arrayNode[this._index]] : null
  }

  /**
   * Builds the root object by populating array specific values inside it. Make sure
   * not to mutate the object inside the loop and instead copy properties from it
   * to form a new object
   */
  private _buildRoot (root: DataRoot, arrayNode: any[]): DataRoot {
    let arrayPaths = (root.arrayPaths || []).concat([this._dotPath])
    let arrayIndexes = root.arrayIndexes ? root.arrayIndexes : []
    return { arrayPaths, arrayIndexes, original: root.original, parentArray: arrayNode }
  }

  /**
   * Runs a callback when value of `dotPath` is an array and it has data
   */
  private _runExecutors (data: DataNode, root: DataRoot, callback: ((item: any[], root: DataRoot) => any)) {
    const arrayNode = this._getData(data)
    const loopItems = this._getLoopItems(arrayNode)

    if (!loopItems) {
      return
    }

    const rootElements = this._buildRoot(root, arrayNode!)
    return callback(loopItems, rootElements)
  }

  /**
   * Updates the indexes array and returns a fresh object by copying
   * other values
   */
  private _updateIndexes (root: DataRoot, index: number): DataRoot {
    return {
      original: root.original,
      arrayIndexes: root.arrayIndexes!.concat([index]),
      parentArray: root.parentArray,
      arrayPaths: root.arrayPaths,
    }
  }

  /**
   * Executes validations asynchronously
   */
  public async execAsync (
    data: DataNode,
    formatter: IndicativeFormatter,
    root: DataRoot,
    bail: boolean,
  ): Promise<boolean> {
    let didFailed: boolean = false

    await this._runExecutors(data, root, async (loopItems, rootElements) => {
      let i = 0

      for (let item of loopItems) {
        for (let executor of this._executors) {
          let passed = false

          /**
           * Running validation and finding it's status
           */
          if (executor.async) {
            passed = await executor.fn(item, formatter, this._updateIndexes(rootElements, i), bail)
          } else {
            passed = executor.fn(item, formatter, this._updateIndexes(rootElements, i), bail) as boolean
          }

          if (!passed) {
            didFailed = true
            if (bail) {
              break
            }
          }
        }

        /**
         * Exit top level loop when child loop sets this value to
         * true.
         */
        if (didFailed && bail) {
          break
        }

        i++
      }
    })

    return !didFailed
  }

  /**
   * Executes validations synchronously
   */
  public exec (data: DataNode, formatter: IndicativeFormatter, root: DataRoot, bail: boolean): boolean {
    let didFailed: boolean = false

    this._runExecutors(data, root, (loopItems, rootElements) => {
      let i = 0

      for (let item of loopItems) {
        for (let executor of this._executors) {
          const passed = executor.fn(item, formatter, this._updateIndexes(rootElements, i), bail)
          if (!passed) {
            didFailed = true
            if (bail) {
              break
            }
          }
        }

        if (didFailed && bail) {
          break
        }

        i++
      }
    })

    return !didFailed
  }
}
