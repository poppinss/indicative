/**
 * indicative-compiler
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { pope } from 'pope'
import { ParsedFieldsMessages, ParsedRulesMessages, ParsedRule, Message } from 'indicative-parser'
import { defaultMessage } from '../utils'

/**
 * Messages store manages the parsed messages tree and make message
 * for a given `field` and `rule`. The store is used progressively
 * by schema tree node consumers.
 */
export class MessagesStore {
  constructor (
    private _fieldsMessages: ParsedFieldsMessages,
    private _rulesMessages: ParsedRulesMessages,
    private _basePath?: string,
  ) {}

  /**
   * Returns message for a given field and rule
   */
  public getMessageFor (field: string, rule: ParsedRule): Message {
    let message: Message = defaultMessage

    const fullPath = this._basePath ? `${this._basePath}.${field}` : field
    const fieldMessages = this._fieldsMessages[fullPath]

    /**
     * Look for message for the field first and then fallback to rules
     * messages
     */
    if (fieldMessages && fieldMessages[rule.name]) {
      message = fieldMessages[rule.name]
    } else if (this._rulesMessages[rule.name]) {
      message = this._rulesMessages[rule.name]
    }

    /**
     * If message is a function, then return it as it is
     */
    if (typeof (message) === 'function') {
      return message
    }

    /**
     * Otherwise make the message with micro templating
     */
    return pope(message, { validation: rule.name, arguments: rule.args, field: fullPath })
  }

  /**
   * Returns child store for a nested dot path
   */
  public getChildStore (dotPath: string[]): MessagesStore {
    const basePath = this._basePath ? `${this._basePath}.${dotPath.join('.')}` : dotPath.join('.')
    return new MessagesStore(this._fieldsMessages, this._rulesMessages, basePath)
  }
}
