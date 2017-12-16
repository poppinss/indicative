import existy from '../src/raw/existy'
export default (value, isStrict) => {
  return isStrict ? value === undefined : !existy(value)
}
