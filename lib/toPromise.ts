function toPromise (cb) {
  return new Promise((resolve, reject) => {
    const error = cb()
    if (error) {
      return reject(error)
    }
    resolve('validation passed')
  })
}

export default toPromise
