/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { dotProp } from '../utils'
import { ExecutorFunction, FormatterContract, DataNode, DataRoot } from '../Contracts'

/**
 * The size of arrays is unknown unless we get the real data from the users. This wrapper
 * basically wraps the [[Executor]] for array childs and runs them sequentially as
 * the per the size of array.
 *
 * Just like [[Executor]], this class also has `exec` and `execAsync` methods to keep the
 * code performant.
 */
export class ArrayWrapper {
  private _dotPathLength = this._dotPath.length

  constructor (
    private _executors: ExecutorFunction[],
    private _dotPath: string[],
    private _index: string,
  ) {}

  /**
   * Returns data node for the array path inside the actual data
   * node
   */
  private _getArrayNode (data: DataNode): any[] | null {
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
   * then only that index value is returned and wrapped inside an array
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
   * to form a new object, otherwise multiple validations will have the same
   * shared top level object with conflicts inside them
   */
  private _buildRoot (root: DataRoot, arrayNode: any[]): DataRoot {
    let arrayPaths = (root.arrayPaths || []).concat([this._dotPath])
    let arrayIndexes = root.arrayIndexes ? root.arrayIndexes : []

    return { arrayPaths, arrayIndexes, original: root.original, parentArray: arrayNode }
  }

  /**
   * Runs a callback when value of `dotPath` is an array and it has data
   */
  private _getLoopData (data: DataNode, root: DataRoot): { rootElements: DataRoot, loopItems: any[] } | null {
    const arrayNode = this._getArrayNode(data)
    const loopItems = this._getLoopItems(arrayNode)

    if (!loopItems) {
      return null
    }

    const rootElements = this._buildRoot(root, arrayNode!)
    return { rootElements, loopItems }
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
    formatter: FormatterContract,
    root: DataRoot,
    config: unknown,
    bail: boolean,
  ): Promise<boolean> {
    const loopData = this._getLoopData(data, root)

    /**
     * Pass validation when loop data is missing
     */
    if (!loopData) {
      return true
    }

    /**
     * Tracking whether any of the inner loops failed or
     * not. Also in case of `bail=true`, the loops
     * breaks themselves.
     */
    let didFailed: boolean = false
    let i = 0

    /**
     * There are ways to simplify this brutal looking loop. However, Javascript
     * degrades like hell, when we call `non-async` functions with `await`,
     * even thought there is no need for await.
     */
    for (let item of loopData.loopItems) {
      for (let executor of this._executors) {
        const updatedRoot = this._updateIndexes(loopData.rootElements, i)
        let passed = false

        /**
         * Running validation and finding it's status
         */
        if (executor.async) {
          passed = await executor.fn(item, formatter, updatedRoot, config, bail)
        } else {
          passed = executor.fn(item, formatter, updatedRoot, config, bail) as boolean
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

    return !didFailed
  }

  /**
   * Executes validations synchronously
   */
  public exec (
    data: DataNode,
    formatter: FormatterContract,
    root: DataRoot,
    config: unknown,
    bail: boolean,
  ): boolean {
    const loopData = this._getLoopData(data, root)

    /**
     * Pass validation when loop data is missing
     */
    if (!loopData) {
      return true
    }

    /**
     * Tracking whether any of the inner loops failed or
     * not. Also in case of `bail=true`, the loops
     * breaks themselves.
     */
    let didFailed: boolean = false
    let i = 0

    for (let item of loopData.loopItems) {
      for (let executor of this._executors) {
        const updatedRoot = this._updateIndexes(loopData.rootElements, i)
        const passed = executor.fn(item, formatter, updatedRoot, config, bail)

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

    return !didFailed
  }
}
