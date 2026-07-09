import type { SegmentedControlExpose as NativeSegmentedControlExpose, SegmentedControlProps as NativeSegmentedControlProps } from '@doraemon-ui/miniprogram.segmented-control'

import type { BasicComponent } from '../../types'

export interface SegmentedControlProps extends NativeSegmentedControlProps, BasicComponent {
  onChange?: (event: any) => void
}

export interface SegmentedControlExpose extends NativeSegmentedControlExpose {}
