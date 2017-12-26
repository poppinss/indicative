export default (input) => {
  try {
    const __o__ = JSON.parse(input) || {}
    return !!__o__
  } catch (e) {
    return false
  }
}
