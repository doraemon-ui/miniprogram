import classNames from 'classnames'
import { styleToCssString } from '../util/styleToCssString'
import { warn } from '../util/warn'
import { isEqual } from '../util/isEqual'

export const util: {
  warn: typeof warn
  isEqual: typeof isEqual
  classNames: (...args: any[]) => string
  styleToCssString: typeof styleToCssString
} = {
  warn,
  isEqual,
  classNames,
  styleToCssString,
}

export { extend } from './extend'
