export * from './dogShit'
export * from './doraProp'
export * from './doraQuote'

import dogShit from './dogShit'
import doraProp from './doraProp'
import doraQuote from './doraQuote'

export { doraProp, doraQuote }

export default {
  ...dogShit,
  ...doraProp,
  doraQuote,
}
