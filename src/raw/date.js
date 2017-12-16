export default (input, strict = true) => {
  if (input instanceof Date === true) {
    return true
  }

  if (strict) {
    return false
  }

  return new Date(input).toString() !== 'Invalid Date'
}
