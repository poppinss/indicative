export default (input, strict) => {
  const isNumber = typeof input === 'number' && !isNaN(input)
  if (input === true || input === false) return false
  if (!isNumber && !strict) {
    return !isNaN(input)
  }
  return isNumber
}
