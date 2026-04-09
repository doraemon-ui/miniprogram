import type {
  SegmentedControlProps as NativeSegmentedControlProps,
  SegmentedControlExpose as NativeSegmentedControlExpose,
} from '@doraemon-ui/miniprogram.segmented-control'
import type { BasicComponent } from '@/types'

export interface SegmentedControlProps extends NativeSegmentedControlProps, BasicComponent {}

export interface SegmentedControlExpose extends NativeSegmentedControlExpose {}
