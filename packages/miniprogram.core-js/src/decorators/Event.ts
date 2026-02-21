import type { Doraemon } from '../instance'

export type IAnyObject = Record<string, any>
export type Target<D extends IAnyObject = IAnyObject> = {
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

export interface BaseEvent<M extends IAnyObject = IAnyObject, C extends IAnyObject = IAnyObject, T extends IAnyObject = C> {
  /** 事件类型 */
  type: string
  /** 页面打开到触发事件所经过的毫秒数 */
  timeStamp: number
  /** 事件冒泡路径上所有由 `mark:` 开头的自定义属性组成的集合 */
  mark?: M
  /** 触发事件的源组件 */
  target: Target<T>
  /** 事件绑定的当前组件 */
  currentTarget: Target<C>
}

export interface CustomEvent<
  D extends IAnyObject = IAnyObject,
  M extends IAnyObject = IAnyObject,
  C extends IAnyObject = IAnyObject,
  T extends IAnyObject = C,
> extends BaseEvent<M, C, T> {
  /** 额外的信息 */
  detail: D
  /** 触发事件的源组件 */
  target: Target<T> & D
  /** 事件绑定的当前组件 */
  currentTarget: Target<C> & D
  preventDefault(): void
  stopPropagation(): void
}

export interface TouchDetail {
  /** 距离页面可显示区域 (屏幕除去导航条) 左上角距离，横向为 X 轴 */
  clientX: number
  /** 距离页面可显示区域 (屏幕除去导航条) 左上角距离，纵向为 Y 轴 */
  clientY: number
  /** 触摸点的标识符 */
  identifier: number
  /** 距离文档左上角的距离，文档的左上角为原点，横向为 X 轴 */
  pageX: number
  /** 距离文档左上角的距离，文档的左上角为原点，纵向为 Y 轴 */
  pageY: number
}

export interface TouchEvent<
  D extends IAnyObject = IAnyObject,
  M extends IAnyObject = IAnyObject,
  C extends IAnyObject = IAnyObject,
  T extends IAnyObject = C,
> extends CustomEvent<D, M, C, T> {
  /** 触摸事件，当前停留在屏幕中的触摸点信息的数组 */
  touches: TouchDetail[]
  /** 触摸事件，当前变化的触摸点信息的数组 */
  changedTouches: TouchDetail[]
}

/**
 * decorator of an event function
 *
 * @return MethodDecorator
 */
export function Event(): MethodDecorator {
  return function (_target: Doraemon, propertyKey: string, descriptor: any) {
    const original = descriptor.value
    descriptor.value = function dispatchEvent(e: any) {
      const event: CustomEvent = { ...e }
      if (event) {
        event.preventDefault = function () {}
        event.stopPropagation = function () {}
        event.target = event.target || ({} as Target)
        event.currentTarget = event.currentTarget || event.target || ({} as Target)
        event.detail = event.detail || {}
        Object.assign(event.target, event.detail)
        Object.assign(event.currentTarget, event.detail)
      }
      return original.call(this, event)
    }
  }
}
