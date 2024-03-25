import { Doraemon } from '../instance/init'

export type IAnyObject = WechatMiniprogram.IAnyObject
export type Target<
  D extends IAnyObject = IAnyObject
> = {
  /** 事件组件的 id */
  id: string
  /** 当前组件的类型 */
  tagName?: string
  /** 事件组件上由 `data-` 开头的自定义属性组成的集合 */
  dataset: D
  /** 距离页面顶部的偏移量 */
  offsetTop: number
  /** 距离页面左边的偏移量 */
  offsetLeft: number
}

export interface BaseCustomEvent<
  D extends IAnyObject = IAnyObject,
  M extends IAnyObject = IAnyObject,
  C extends IAnyObject = IAnyObject,
  T extends IAnyObject = C
> extends WechatMiniprogram.BaseEvent<M, C, T> {
  /** 额外的信息 */
  detail: D
}

export interface CustomEvent<
  D extends IAnyObject = IAnyObject,
  M extends IAnyObject = IAnyObject,
  C extends IAnyObject = IAnyObject,
  T extends IAnyObject = C
> extends BaseCustomEvent<D, M, C, T> {
  /** 触发事件的源组件 */
  target: Target<T> & D
  /** 事件绑定的当前组件 */
  currentTarget: Target<C> & D
  preventDefault(): void
  stopPropagation(): void
}

/**
 * decorator of an event function
 *
 * @return MethodDecorator
 */
export function Event(): MethodDecorator {
  return function (_target: Doraemon, propertyKey: string, descriptor: any) {
    const original = descriptor.value
    descriptor.value = function dispatchEvent(e) {
      const event: CustomEvent = { ...e }
      if (event) {
        event.preventDefault = function () {}
        event.stopPropagation = function () {}
        event.target = event.target || {} as Target
        event.currentTarget = event.currentTarget || event.target || {} as Target
        event.detail = event.detail || {}
        Object.assign(event.target, event.detail)
        Object.assign(event.currentTarget, event.detail)
      }
      return original.call(this, event)
    }
  }
}
