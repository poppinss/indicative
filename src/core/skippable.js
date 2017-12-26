import config from './config'
import existy from '../raw/existy'

export default (value) => {
  return config.EXISTY_STRICT ? value === undefined : !existy(value)
}
