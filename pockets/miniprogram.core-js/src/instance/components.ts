import { isPlainObject } from '../util/isPlainObject'
import { noop } from '../util/noop'

export function initComponents(vm, components): {
  [componentName: string] : WechatMiniprogram.Component.RelationOption
} {
  return Object.keys(components).reduce((acc, key) => {
    const { module: componentName, type = 'child', observer = noop } = getData(components[key])
    const linkCb = function () {
      if (typeof observer === 'string') {
        return this[observer]()
      } else if (typeof observer === 'function') {
        return observer()
      }
    }
    const option: WechatMiniprogram.Component.RelationOption = {
      type,
      linked: linkCb,
      linkChanged: linkCb,
      unlinked: linkCb,
    }
    return {
      ...acc,
      [componentName]: option,
    }
  }, {})
}

export function getData (comp) {
  if (typeof comp === 'function') {
    const ret = comp()
    return {
      ['module']: ret.module,
      type: ret.type,
      observer: ret.observer,
    }
  } else if (typeof comp === 'string') {
    return {
      ['module']: comp,
    }
  } else if (isPlainObject(comp)) {
    return {
      ['module']: comp.module,
      type: comp.type,
      observer: comp.observer,
    }
  }
  return {}
}
