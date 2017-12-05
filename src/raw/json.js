export default (input) => {
  try {
    const __o__ = JSON.parse(input) || {}
    return !!__o__
    return true
  } catch (e) {
    return false
  }
}
