import { createDecorator } from './Component'
import type { Doraemon } from '../Doraemon'
import type { PropOptions } from '../types/options'

type Constructor = {
  new (...args: any[]): any;
}

/**
 * decorator of a prop
 *
 * @param  options the options for the prop
 * @return PropertyDecorator | void
 */
export function Prop (options?: (PropOptions | Constructor[] | Constructor)): PropertyDecorator {
  return function (target: Doraemon, key: string) {
    createDecorator((componentOptions, k) => {
      ;(componentOptions.props || ((componentOptions.props = {}) as any))[
        k
      ] = options
    })(target, key)
  }
}
