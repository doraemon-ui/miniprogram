import type { PopoverExpose as NativePopoverExpose, PopoverProps as NativePopoverProps } from '@doraemon-ui/miniprogram.popover'

import type { BasicComponent } from '../../types'

export interface PopoverProps extends NativePopoverProps, BasicComponent {
  onChange?: (event: any) => void
}

export interface PopoverExpose extends NativePopoverExpose {}
