import { isPromise } from '../util/isPromise'
import type { Doraemon } from '../instance'

const hyphenateRE = /\B([A-Z])/g
const hyphenate = (str: string) => str.replace(hyphenateRE, '-$1').toLowerCase()

/**
 * decorator of an event-emitter function
 *
 * @param  event The name of the event
 * @return MethodDecorator
 */
export function Emit(event?: string): MethodDecorator {
  return function (_target: Doraemon, propertyKey: string, descriptor: any) {
    const key = hyphenate(propertyKey)
    const original = descriptor.value
    descriptor.value = function emitter(...args: any[]) {
      const emit = (returnValue: any) => {
        const emitName = event || key

        if (returnValue === undefined) {
          if (args.length === 0) {
            this.$emit(emitName)
          } else if (args.length === 1) {
            this.$emit(emitName, args[0])
          } else {
            this.$emit(emitName, ...args)
          }
        } else {
          args.unshift(returnValue)
          this.$emit(emitName, ...args)
        }
      }

      const returnValue: any = original.apply(this, args)

      if (isPromise(returnValue)) {
        returnValue.then(emit)
      } else {
        emit(returnValue)
      }

      return returnValue
    }
  }
}
