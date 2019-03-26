/*
* indicative-compiler
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { isArray, dotProp, getItemsForIndex } from '../utils'
import { SanitizationExecutor, DataNode } from '../Contracts/SanitizationCompiler'

export class ArrayRunner {
  private _dotPathLength = this._dotPath.length

  constructor (
    private _sanitizors: SanitizationExecutor[],
    private _dotPath: string[],
    private _index: string,
  ) {}

  /**
   * Returns a new copy of root object with mutated array
   * paths.
   */
  // private _getRoot (root: DataRoot, tip: any[]): DataRoot {
  //   return {
  //     arrayPaths: (root.arrayPaths || []).concat([this._dotPath]),
  //     arrayIndexes: root.arrayIndexes || [],
  //     original: root.original,
  //     parentArray: tip,
  //   }
  // }

  /**
   * Updates the indexes array and returns a fresh object by copying
   * other values
   */
  // private _updateIndexes (root: DataRoot, index: number): DataRoot {
  //   return {
  //     original: root.original,
  //     arrayIndexes: root.arrayIndexes!.concat([index]),
  //     parentArray: root.parentArray,
  //     arrayPaths: root.arrayPaths,
  //     currentIndex: index,
  //   }
  // }

  /**
   * Runs all ValidationExecutors in a sequence and reports the final
   * status of all validations
   */
  private _runExecutors (
    node: any,
    _index: number,
    config: unknown,
  ) {
    for (let executor of this._sanitizors) {
      executor(node, config)
    }
  }

  /**
   * Executes child validation executors based upon the length of the array.
   */
  public exec (
    data: DataNode,
    config: unknown,
  ) {
    const tip = dotProp(data, this._dotPath, this._dotPathLength)
    if (!isArray(tip)) {
      return true
    }

    const loopItems = getItemsForIndex(tip, this._index)
    if (!loopItems.length) {
      return true
    }

    // const root = this._getRoot(baseRoot, tip)

    let i = 0

    for (let node of loopItems) {
      this._runExecutors(node, i, config)
    }
  }
}
