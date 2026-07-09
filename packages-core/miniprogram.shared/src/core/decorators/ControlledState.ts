import type { ComponentOptions, Doraemon, WatchHandler } from '@doraemon-ui/miniprogram.core-js'
import { createDecorator } from '@doraemon-ui/miniprogram.core-js'

export interface ControlledStateOptions {
  value?: string
  defaultValue?: string
  controlled?: string
}

export type ControlledStateValue<T> = T | ((origin: T) => T)

function appendWatch(componentOptions: ComponentOptions<Doraemon>, path: string, handler: WatchHandler<any>) {
  componentOptions.watch = componentOptions.watch || Object.create(null)
  const watch = componentOptions.watch as Record<string, unknown>
  const pathWatch = watch[path]

  if (typeof pathWatch === 'object' && pathWatch !== null && !Array.isArray(pathWatch)) {
    watch[path] = [pathWatch]
  } else if (typeof pathWatch === 'undefined') {
    watch[path] = []
  }

  ;(watch[path] as Array<{ handler: WatchHandler<any> }>).push({ handler })
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

function resolveDefaultValueKey(valueKey: string) {
  return `default${capitalize(valueKey)}`
}

function resolveSetterName(key: string) {
  return `set${capitalize(key)}`
}

function isUpdater<T>(value: ControlledStateValue<T>): value is (origin: T) => T {
  return typeof value === 'function'
}

function resolveNextValue<T>(nextValue: ControlledStateValue<T>, previousValue: T) {
  return isUpdater(nextValue) ? nextValue(previousValue) : nextValue
}

function resolveSourceValue(vm: Doraemon, key: string) {
  if (key in vm) {
    return vm[key]
  }

  const props = vm.$props
  if (props && key in props) {
    return props[key]
  }

  return undefined
}

function resolveControlledValue(vm: Doraemon, options: ControlledStateOptions) {
  const controlled = resolveSourceValue(vm, options.controlled)
  if (controlled) {
    return resolveSourceValue(vm, options.value)
  }

  return resolveSourceValue(vm, options.defaultValue)
}

function normalizeOptions(
  valueOrOptions: string | ControlledStateOptions,
  override?: string | ControlledStateOptions,
): ControlledStateOptions {
  const baseOptions = typeof valueOrOptions === 'string' ? { value: valueOrOptions } : valueOrOptions
  const overrideOptions = typeof override === 'string' ? { value: override } : override

  const valueKey = overrideOptions?.value || baseOptions.value || ''

  return {
    value: valueKey,
    defaultValue: overrideOptions?.defaultValue || baseOptions.defaultValue || resolveDefaultValueKey(valueKey),
    controlled: overrideOptions?.controlled || baseOptions.controlled || 'controlled',
  }
}

export function useControlledState(valueOrOptions: string | ControlledStateOptions) {
  let key = ''

  const setControlledState = <Value>(instance: Doraemon, nextValue: ControlledStateValue<Value>, condition = false): void => {
    const setter = Reflect.get(instance, resolveSetterName(key))

    if (typeof setter === 'function') {
      setter.call(instance, nextValue, condition)
    }
  }

  function decorate(options: ControlledStateOptions): PropertyDecorator {
    return (target, propertyKey) => {
      key = String(propertyKey)
      const watchHandlerName = `__watch_controlled_state__${key}`
      const setterName = resolveSetterName(key)

      createDecorator((componentOptions: ComponentOptions<Doraemon>) => {
        componentOptions.methods = componentOptions.methods || {}
        const methods = componentOptions.methods as Record<string, unknown>

        if (!methods[setterName]) {
          methods[setterName] = function setControlledState(this: Doraemon, nextValue: ControlledStateValue<unknown>, condition = false) {
            const value = resolveNextValue(nextValue, this[key])

            if (condition || !this[options.controlled]) {
              this[key] = value
            }
          }
        }

        if (!methods[watchHandlerName]) {
          methods[watchHandlerName] = function watchControlledState(this: Doraemon, nextValue: unknown, _oldValue: unknown) {
            if (!resolveSourceValue(this, options.controlled)) {
              return
            }

            const setter = Reflect.get(this, setterName)
            if (typeof setter === 'function') {
              setter.call(this, nextValue, true)
            }
          }
        }

        appendWatch(componentOptions, options.value, watchHandlerName)
        ;(componentOptions.mixins || (componentOptions.mixins = [])).push({
          data(this: Doraemon) {
            const value = resolveControlledValue(this, options)
            return value === undefined ? {} : { [key]: value }
          },
        })
      })(target as Doraemon, key)
    }
  }

  function ControlledState(override?: string | ControlledStateOptions): PropertyDecorator
  function ControlledState(override?: string | ControlledStateOptions) {
    return decorate(normalizeOptions(valueOrOptions, override))
  }

  return {
    ControlledState,
    setControlledState,
  }
}
