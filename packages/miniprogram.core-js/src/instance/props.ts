import { hasOwn } from '../util/hasOwn'
import type { PropOptions } from '../types/options'

const NULL_PROP = null

export function initProps (vm, propsOptions: object): WechatMiniprogram.Component.PropertyOption {
  // miniprogram props
  const properties = {}
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

export function validateProp (key: string, propsOptions, propsData, vm) {
  const prop = propsOptions[key]
  let value = propsData[key]
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key)
  }
  return value
}

function getPropDefaultValue (vm, prop: PropOptions, key: string) {
  // no default, return null
  if (!hasOwn(prop, 'default')) {
    return NULL_PROP
  }
  const def = prop.default
  let value = typeof def === 'function' ? def.call(vm) : def
  // fix undefined for miniprogram
  if (value === undefined) {
    value = NULL_PROP
  }
  return value
}
