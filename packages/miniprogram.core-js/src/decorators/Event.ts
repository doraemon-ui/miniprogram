import { Doraemon } from '../instance/init'

interface CustomEvent extends WechatMiniprogram.CustomEvent {
  target: any
  currentTarget: any
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
        event.target = event.target || {}
        event.currentTarget = event.currentTarget || event.target || {}
        event.detail = event.detail || {}
        Object.assign(event.target, event.detail)
        Object.assign(event.currentTarget, event.detail)
      }
      return original.call(this, event)
    }
  }
}
