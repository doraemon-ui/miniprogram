export * from './canUseMP'
export * from './findComponentNode'
export * from './getCurrentPage'
export * from './useDOM'

import { canUseMP } from './canUseMP'
import { findComponentNode } from './findComponentNode'
import { getCurrentPage } from './getCurrentPage'
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

export default {
  canUseMP,
  findComponentNode,
  getCurrentPage,
  useQuery,
  useSelector,
  useSelectorAll,
  useRef,
  useRefAll,
  useRect,
  useRectAll,
  useScrollOffset,
  useComputedStyle
}
