import { createDecorator } from './Component'
import type { WatchOptions } from '../types/options'

/**
 * decorator of a watch function
 *
 * @param  path the path or the expression to observe
 * @param  WatchOption
 * @return MethodDecorator
 */
export function Watch(path: string, watchOptions: WatchOptions = {}): MethodDecorator {
  return createDecorator((componentOptions, handler) => {
    componentOptions.watch = componentOptions.watch || Object.create(null)
    const watch: any = componentOptions.watch
    if (typeof watch[path] === 'object' && !Array.isArray(watch[path])) {
      watch[path] = [watch[path]]
    } else if (typeof watch[path] === 'undefined') {
      watch[path] = []
    }

    watch[path].push({ handler, ...watchOptions })
  })
}
