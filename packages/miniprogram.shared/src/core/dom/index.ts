export * from './canUseMP'
export * from './findComponentNode'
export * from './getCurrentPage'
export * from './global'
export * from './useDOM'
export * from './useGesture'
export * from './useNativeAPI'
export * from './useNativeRoute'
export * from './usePopupStateHOC'

import { canUseMP } from './canUseMP'
import { findComponentNode } from './findComponentNode'
import { getCurrentPage } from './getCurrentPage'
import { miniprogramThis } from './global'
import {
  useQuery,
  useSelector,
  useSelectorAll,
  useRef,
  useRefAll,
  useRect,
  useRectAll,
  useScrollOffset,
  useComputedStyle
} from './useDOM'
import {
  getTouchPoints,
  getPointsNumber,
  isEqualPoints,
  isNearbyPoints,
  getPointsDistance,
  getSwipeDirection
} from './useGesture'
import {
  getSystemInfoSync,
  getMenuButtonBoundingClientRectSync
} from './useNativeAPI'
import { useNativeRoute } from './useNativeRoute'
import { usePopupStateHOC } from './usePopupStateHOC'

export default {
  canUseMP,
  findComponentNode,
  getCurrentPage,
  miniprogramThis,
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
  usePopupStateHOC
}
