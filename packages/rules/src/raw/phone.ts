/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const phoneRegex = /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/

export const phone = (input: string): boolean => phoneRegex.test(input)
