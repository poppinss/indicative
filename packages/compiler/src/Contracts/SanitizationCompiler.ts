/*
* indicative-compiler
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

/**
 * Sanitization data
 */
export type DataNode = {
  [field: string]: any,
}

/**
 * Shape of top level validation runner objects
 */
export type SanitizationExecutor = ((
  data: DataNode,
  config: unknown,
) => void)

/**
 * Arguments for node consumer
 */
export type NodeConsumerArgs = [Sanitizations]

/**
 * Shape of a single validation node. The `validate` function
 * is called at runtime and `compile` is called at compile
 * time.
 *
 * The async flag is required to generate optimized top level
 * functions
 */
export type Sanitization = {
  compile?: (args: any[]) => any[],
  sanitize: ((
    data: DataNode,
    field: string,
    args: any[],
    type: 'object' | 'literal' | 'array',
    config: unknown,
  ) => void),
}

/**
 * Shape of validations object
 */
export type Sanitizations = {
  [field: string]: Sanitization,
}
