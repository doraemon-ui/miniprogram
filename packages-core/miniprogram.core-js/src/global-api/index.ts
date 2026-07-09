import classNames from 'classnames'

import { isEqual } from '../util/isEqual'
import { styleToCssString } from '../util/styleToCssString'
import { warn } from '../util/warn'

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
