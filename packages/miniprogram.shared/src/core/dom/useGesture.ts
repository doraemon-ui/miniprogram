import type { TouchEvent } from '@doraemon-ui/miniprogram.core-js'

export type TouchPoint = {
  x: number
  y: number
}

/**
 * 获取触摸点位置信息
 */
export const getTouchPoints = (nativeEvent: TouchEvent, index = 0): TouchPoint => {
  const touches = nativeEvent.touches
  const changedTouches = nativeEvent.changedTouches
  const hasTouches = touches && touches.length > 0
  const hasChangedTouches = changedTouches && changedTouches.length > 0
  const points = !hasTouches && hasChangedTouches ? changedTouches[index] : touches[index]

  return {
    x: points.pageX,
    y: points.pageY,
  }
}

/**
* 获取触摸点个数
*/
export const getPointsNumber = (e: TouchEvent): number => e.touches?.length || e.changedTouches?.length || 0

/**
* 判断是否为同一点
*/
export const isEqualPoints = (p1: TouchPoint, p2: TouchPoint): boolean => p1.x === p2.x && p1.y === p2.y

/**
* 判断是否为相近的两点
*/
export const isNearbyPoints = (p1: TouchPoint, p2: TouchPoint, DOUBLE_TAP_RADIUS = 25): boolean => {
  const xMove = Math.abs(p1.x - p2.x)
  const yMove = Math.abs(p1.y - p2.y)
  return xMove < DOUBLE_TAP_RADIUS && yMove < DOUBLE_TAP_RADIUS
}

/**
* 获取两点之间的距离
*/
export const getPointsDistance = (p1: TouchPoint, p2: TouchPoint): number => {
  const xMove = Math.abs(p1.x - p2.x)
  const yMove = Math.abs(p1.y - p2.y)
  return Math.sqrt(xMove * xMove + yMove * yMove)
}

export type TouchDirection = 'Left' | 'Right' | 'Up' | 'Down'

/**
* 获取触摸移动方向
*/
export const getTouchDirection = (x1: number, x2: number, y1: number, y2: number): TouchDirection => {
  return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down')
}
