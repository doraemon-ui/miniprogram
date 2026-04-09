import type {
  SelectorGroupProps as NativeSelectorGroupProps,
  SelectorGroupExpose as NativeSelectorGroupExpose,
} from '@doraemon-ui/miniprogram.selector-group'
import type { BasicComponent } from '@/types'

export interface SelectorGroupProps extends NativeSelectorGroupProps, BasicComponent {}

export interface SelectorGroupExpose extends NativeSelectorGroupExpose {}
