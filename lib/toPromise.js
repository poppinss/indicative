export default (cb) => {
  return new Promise((resolve, reject) => {
    const error = cb()
    if (error) {
      return reject(error)
    }
    resolve('validation passed')
  })
}
