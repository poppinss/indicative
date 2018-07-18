export default (fn, done) => {
  Promise.resolve(fn())
    .then(done)
    .catch(done)
}
