export default (input, strict = false) => {
  const isDateInstance = input instanceof Date
  if (!isDateInstance && !strict) {
    return new Date(input).toString() !== 'Invalid Date'
  }
  return isDateInstance
}
