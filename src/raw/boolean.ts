export default (input, strict = true) => {
  const bools = [true, false, 0, 1]
  if (strict) {
    return bools.indexOf(input) > -1
  }
  return bools.map((b) => String(b)).indexOf(String(input)) > -1
}
