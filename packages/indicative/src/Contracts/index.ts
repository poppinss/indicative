/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { RulesConfig } from 'indicative-rules'
import { FormatterContract } from 'indicative-compiler'

export type FormatterConstructorContract = {
  new (): FormatterContract,
}

export type Config = RulesConfig & {
  formatter: FormatterConstructorContract,
}

export type ValidationOptions = Config & {
  cacheKey: string,
}
