import { config } from './config'
import existy from '../raw/existy'

export default (value: any): boolean => {
  return config.EXISTY_STRICT ? value === undefined : !existy(value)
}
