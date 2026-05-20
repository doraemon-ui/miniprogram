export * from './core'
export * from './types'

import { decorators, dom, util } from './core'
import { hooks } from './core'

export default {
  decorators,
  dom,
  hooks,
  util,
  ...decorators,
  ...dom,
  ...hooks,
  ...util,
}
