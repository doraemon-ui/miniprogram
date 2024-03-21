export * from './canUseMP'
export * from './findComponentNode'
export * from './getCurrentPage'
export * from './global'
export * from './useDOM'
export * from './useNativeAPI'

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
  getSystemInfoSync,
  getMenuButtonBoundingClientRectSync
} from './useNativeAPI'

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
  getSystemInfoSync,
  getMenuButtonBoundingClientRectSync
}
