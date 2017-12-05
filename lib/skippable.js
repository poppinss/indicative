import existy from '../src/raw/existy'
export default (value, isStrict) => {
  return isStrict ? typeof (value) === 'undefined' : !existy(value)
}
