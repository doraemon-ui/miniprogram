import { Doraemon, type DoraemonClass } from '../instance/init'
import { LIFECYCLE_HOOKS } from '../util/constants'
import { hasOwn } from '../util/hasOwn'
import { hasProto } from '../util/hasProto'
import { isPrimitive } from '../util/isPrimitive'
import type { ComponentOptions } from '../types/options'

type DecoratedClass = { new (...args: any[]) } & {
  __decorators__?: any
}

export interface DoraemonDecorator {
  // Class decorator
  (Ctor: typeof Doraemon): void

  // Property decorator
  (target: Doraemon, key: string): void

  // Parameter decorator
  (target: Doraemon, key: string, index: number): void
}

export function createDecorator (factory: (options: ComponentOptions<Doraemon>, key: string, index: number) => void): DoraemonDecorator {
  return (target: Doraemon | typeof Doraemon, key?: string, index?: any) => {
    const Ctor = typeof target === 'function'
      ? target as DecoratedClass
      : target.constructor as DecoratedClass
    if (!Ctor.__decorators__) {
      Ctor.__decorators__ = []
    }
    if (typeof index !== 'number') {
      index = undefined
    }
    Ctor.__decorators__.push(options => factory(options, key, index))
  }
}

export const $internalHooks = [
  'data',
  ...LIFECYCLE_HOOKS,
]

export function componentFactory (
  Component: DoraemonClass<Doraemon>,
  options: ComponentOptions<Doraemon> = {}
): DoraemonClass<Doraemon> {
  options.name = options.name || (Component as any)._componentTag || (Component as any).name
  
  // prototype props.
  const proto = Component.prototype
  Object.getOwnPropertyNames(proto).forEach(function (key) {
    if (key === 'constructor') {
      return
    }

    // hooks
    if ($internalHooks.indexOf(key) > -1) {
      options[key] = proto[key]
      return
    }
    const descriptor = Object.getOwnPropertyDescriptor(proto, key)!
    if (descriptor.value !== void 0) {
      // methods
      if (typeof descriptor.value === 'function') {
        (options.methods || (options.methods = {}))[key] = descriptor.value
      } else {
        // typescript decorated data
        (options.mixins || (options.mixins = [])).push({
          data () {
            return { [key]: descriptor.value }
          },
        })
      }
    } else if (descriptor.get || descriptor.set) {
      // computed properties
      (options.computed || (options.computed = {}))[key] = {
        get: descriptor.get,
        set: descriptor.set,
      }
    }
  })

  // add data hook to collect class properties as Doraemon instance's data
  ;(options.mixins || (options.mixins = [])).push({
    data () {
      return collectDataFromConstructor(this, Component)
    },
  })

  // decorate options
  const decorators = (Component as DecoratedClass).__decorators__
  if (decorators) {
    decorators.forEach(fn => fn(options))
    delete (Component as DecoratedClass).__decorators__
  }

  // find super
  const superProto = Object.getPrototypeOf(Component.prototype)
  const Super = superProto instanceof Doraemon
    ? superProto.constructor as DoraemonClass<Doraemon>
    : Doraemon
  const Extended = Super.extend(options)

  forwardStaticMembers(Extended, Component, Super)

  return Extended
}

function forwardStaticMembers (
  Extended: typeof Doraemon,
  Original: typeof Doraemon,
  Super: typeof Doraemon
) {
  // We have to use getOwnPropertyNames since Babel registers methods as non-enumerable
  Object.getOwnPropertyNames(Original).forEach(key => {
    // `prototype` should not be overwritten
    if (key === 'prototype') {
      return
    }

    // Some browsers does not allow reconfigure built-in properties
    const extendedDescriptor = Object.getOwnPropertyDescriptor(Extended, key)
    if (extendedDescriptor && !extendedDescriptor.configurable) {
      return
    }

    const descriptor = Object.getOwnPropertyDescriptor(Original, key)!

    if (!hasProto) {
      if (key === 'cid') {
        return
      }

      const superDescriptor = Object.getOwnPropertyDescriptor(Super, key)

      if (
        !isPrimitive(descriptor.value) &&
        superDescriptor &&
        superDescriptor.value === descriptor.value
      ) {
        return
      }
    }
    Object.defineProperty(Extended, key, descriptor)
  })
}

export function collectDataFromConstructor (vm, Component: DoraemonClass<Doraemon>) {
  // override _init to prevent to init as Doraemon instance
  const originalInit = Component.prototype._init
  Component.prototype._init = function () {
    // proxy to actual vm
    const keys = Object.getOwnPropertyNames(vm)
    const props = vm.$options.props || {}
    if (props) {
      for (const key in props) {
        if (!this.hasOwnProperty(key)) {
          keys.push(key)
        }
      }
    }

    keys.forEach(key => {
      if (key.charAt(0) !== '_') {
        Object.defineProperty(this, key, {
          get: () => vm[key],
          // set: value => { vm[key] = value },
          set: value => {
            if (!(props && hasOwn(props, key))) {
              vm[key] = value !== undefined ? value : null
            }
          },
          configurable: true,
        })
      }
    })
  }

  // should be acquired class property values
  const data = new Component()

  // restore original _init to avoid memory leak
  Component.prototype._init = originalInit

  // create plain data object
  const plainData = {}
  Object.keys(data).forEach(key => {
    if (data[key] !== undefined) {
      plainData[key] = data[key]
    }
  })
  return plainData
}

function Component <D extends Doraemon>(options: ComponentOptions<D> & ThisType<D>): <DC extends DoraemonClass<D>>(target: DC) => DC
function Component <DC extends DoraemonClass<Doraemon>>(target: DC): DC
function Component (options: DoraemonClass<Doraemon> | ComponentOptions<Doraemon>) {
  if (typeof options === 'function') {
    return componentFactory(options)
  }
  return function (Component: DoraemonClass<Doraemon>) {
    return componentFactory(Component, options)
  }
}

Component.registerHooks = function registerHooks (keys: string[]): void {
  $internalHooks.push(...keys)
}

export {
  Component,
}