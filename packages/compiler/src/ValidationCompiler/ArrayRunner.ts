/*
* indicative-compiler
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { DataRoot, DataNode, FormatterContract, ValidationExecutor } from '../Contracts/ValidationCompiler'
import { isArray, dotProp, getItemsForIndex } from '../utils'

export class ArrayRunner {
  private _dotPathLength = this._dotPath.length

  constructor (
    private _executors: ValidationExecutor[],
    private _dotPath: string[],
    private _index: string,
  ) {}

  /**
   * Returns a new copy of root object with mutated array
   * paths.
   */
  private _getRoot (root: DataRoot, tip: any[]): DataRoot {
    return {
      arrayPaths: (root.arrayPaths || []).concat([this._dotPath]),
      arrayIndexes: root.arrayIndexes || [],
      original: root.original,
      parentArray: tip,
    }
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
      currentIndex: index,
    }
  }

  /**
   * Runs all ValidationExecutors in a sequence and reports the final
   * status of all validations
   */
  private _runExecutors (
    node: any,
    formatter: FormatterContract,
    root: DataRoot,
    index: number,
    config: unknown,
    bail: boolean,
  ): boolean {
    let allPassed = true

    for (let executor of this._executors) {
      const passed = executor.fn(node, formatter, this._updateIndexes(root, index), config, bail)

      /**
       * Set failing status to top level `allPassed` variable
      */
      if (!passed) {
        allPassed = false
      }

      /**
       * Break when not passed and bail is true
       */
      if (!allPassed && bail) {
        break
      }
    }

    return allPassed
  }

  /**
   * Same as `[[ArrayRunner._runExecutors]]` but with support
   * for async executors as well.
   */
  private async _runAsyncExecutors (
    node: any,
    formatter: FormatterContract,
    root: DataRoot,
    index: number,
    config: unknown,
    bail: boolean,
  ): Promise<boolean> {
    let allPassed = true

    for (let executor of this._executors) {
      let passed = false

      if (executor.async) {
        passed = await executor.fn(node, formatter, this._updateIndexes(root, index), config, bail)
      } else {
        passed = executor.fn(node, formatter, this._updateIndexes(root, index), config, bail) as boolean
      }

      /**
       * Set failing status to top level `allPassed` variable
      */
      if (!passed) {
        allPassed = false
      }

      /**
       * Break when not passed and bail is true
       */
      if (!allPassed && bail) {
        break
      }
    }

    return allPassed
  }

  /**
   * Executes child validation executors based upon the length of the array.
   */
  public exec (
    data: DataNode,
    formatter: FormatterContract,
    baseRoot: DataRoot,
    config: unknown,
    bail: boolean,
  ): boolean {
    const tip = dotProp(data, this._dotPath, this._dotPathLength)
    if (!isArray(tip)) {
      return true
    }

    const loopItems = getItemsForIndex(tip, this._index)
    if (!loopItems.length) {
      return true
    }

    const root = this._getRoot(baseRoot, tip)

    let passed: boolean = false
    let i = 0

    for (let node of loopItems) {
      passed = this._runExecutors(node, formatter, root, i, config, bail)
      if (!passed && bail) {
        break
      }

      i++
    }

    return passed
  }

  /**
   * Same as [[ArrayRunner.exec]], but for async validations
   */
  public async execAsync (
    data: DataNode,
    formatter: FormatterContract,
    baseRoot: DataRoot,
    config: unknown,
    bail: boolean,
  ): Promise<boolean> {
    const tip = dotProp(data, this._dotPath, this._dotPathLength)
    if (!isArray(tip)) {
      return true
    }

    const loopItems = getItemsForIndex(tip, this._index)
    if (!loopItems.length) {
      return true
    }

    const root = this._getRoot(baseRoot, tip)

    let passed: boolean = false
    let i = 0

    for (let node of loopItems) {
      passed = await this._runAsyncExecutors(node, formatter, root, i, config, bail)

      if (!passed && bail) {
        break
      }

      i++
    }

    return passed
  }
}
