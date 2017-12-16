export default (input, regex) => {
  if (regex instanceof RegExp === false) {
    throw new Error('You must pass regex as the 2nd argument')
  }
  return regex.test(input)
}
