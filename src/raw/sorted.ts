export default (input) => {
  if (!Array.isArray(input)) {
    return false
  }

  let scaledDown = false
  let i = 0
  while (i < input.length) {
    const b = input[i++]
    const a = input[i - 2]
    if (a && a > b) {
      scaledDown = true
      break
    }
  }
  return !scaledDown
}
