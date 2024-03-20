export * from './core'
export * from './types'

import { dom, util } from './core'

export default {
  dom,
  util,
  ...dom,
  ...util,
}
