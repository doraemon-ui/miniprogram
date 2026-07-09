import type { SelectorGroupExpose as NativeSelectorGroupExpose, SelectorGroupProps as NativeSelectorGroupProps } from '@doraemon-ui/miniprogram.selector-group'

import type { BasicComponent } from '../../types'

export interface SelectorGroupProps extends NativeSelectorGroupProps, BasicComponent {
  onChange?: (event: any) => void
}

export interface SelectorGroupExpose extends NativeSelectorGroupExpose {}
