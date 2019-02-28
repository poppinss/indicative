/**
 *  Returns if the `input` is one of the affirmative keywords.
 *  Below is the list of keywords and are not case-sensitive
 *  except `A`.
 *
 *  - yes
 *  - true
 *  - y
 *  - ok
 *  - okay
 *  - A
 *
 *  @method affirmative
 *
 *  @param  {String}
 *
 *  @return {Boolean}
 */
export default (input: string): boolean => {
  if (input === 'A') {
    return true
  }

  return ['yes', 'true', 'y', 'ok', 'okay'].indexOf(input.toLowerCase()) > -1
}
