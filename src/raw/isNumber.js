export default (input, strict) => {
  const isNumber = typeof input === 'number'
  if (!isNumber && !strict) {
    return !isNaN(input)
  }
  return isNumber
}
