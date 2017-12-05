const alphaRegex = /^[a-z]+$/i

/**
 *  Validates a string to contain only alphabets
 *
 *  @method alpha
 *
 *  @param  {String} input
 *
 *  @return {Boolean}
 */
export default (input) => alphaRegex.test(input)
