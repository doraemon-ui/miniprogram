import type { Doraemon } from './init'
import type { ComponentOptions } from '../types/options'
import { hasOwn } from '../util/hasOwn'
import type { PropOptions } from '../types/options'

const isUndefinable = (val: any) => val === undefined 
const NULL_PROP = null

export function initProps (vm: Doraemon, propsOptions: ComponentOptions<Doraemon>['props']) {
  // miniprogram props
  const properties: Record<string, any> = {}
  for (const key in propsOptions) {
    const propOptions = propsOptions[key]
    const type = propOptions.type || NULL_PROP
    const value = validateProp(key, propsOptions, {}, vm)
    // 属性的类型（可以指定多个）
    properties[key] = Array.isArray(type)
      ? { optionalTypes: type, type, value }
      : { type, value }
  }
  return properties
}

export function validateProp (key: string, propsOptions: ComponentOptions<Doraemon>['props'], propsData: ComponentOptions<Doraemon>['data'], vm: Doraemon) {
  const prop = propsOptions[key]
  let value = propsData[key]
  // check default value
  if (isUndefinable(value)) {
    value = getPropDefaultValue(vm, prop, key)
  }
  return value
}

function getPropDefaultValue (vm: Doraemon, prop: PropOptions, key: string) {
  // no default, return null
  if (!hasOwn(prop, 'default')) {
    return NULL_PROP
  }
  const def = prop.default
  let value = typeof def === 'function' ? def.call(vm) : def
  // fix undefined for miniprogram
  if (isUndefinable(value)) {
    value = NULL_PROP
  }
  return value
}
