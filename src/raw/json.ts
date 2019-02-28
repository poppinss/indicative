export default (input) => {
  try {
    const output = JSON.parse(input) || {}
    return !!output
  } catch (e) {
    return false
  }
}
