export * from './canUseMP'
export * from './findComponentNode'
export * from './getCurrentPage'
export * from './global'
export * from './useCanvasAPI'
export * from './useDOM'
export * from './useGesture'
export * from './useNativeAPI'
export * from './useNativeRoute'
export * from './usePopupStateHOC'

import { canUseMP } from './canUseMP'
import { findComponentNode } from './findComponentNode'
import { getCurrentPage } from './getCurrentPage'
import { miniprogramThis } from './global'
import { createImage, downloadImage, getCanvasRef, toDataURL } from './useCanvasAPI'
import { useComputedStyle, useQuery, useRect, useRectAll, useRef, useRefAll, useScrollOffset, useSelector, useSelectorAll } from './useDOM'
import { getPointsDistance, getPointsNumber, getSwipeDirection, getTouchPoints, isEqualPoints, isNearbyPoints } from './useGesture'
import { getMenuButtonBoundingClientRectSync, getSystemInfoSync } from './useNativeAPI'
import { useNativeRoute } from './useNativeRoute'
import { usePopupStateHOC } from './usePopupStateHOC'

export default {
  canUseMP,
  findComponentNode,
  getCurrentPage,
  miniprogramThis,
  getCanvasRef,
  downloadImage,
  createImage,
  toDataURL,
  useQuery,
  useSelector,
  useSelectorAll,
  useRef,
  useRefAll,
  useRect,
  useRectAll,
  useScrollOffset,
  useComputedStyle,
  getTouchPoints,
  getPointsNumber,
  isEqualPoints,
  isNearbyPoints,
  getPointsDistance,
  getSwipeDirection,
  getSystemInfoSync,
  getMenuButtonBoundingClientRectSync,
  useNativeRoute,
  usePopupStateHOC,
}
