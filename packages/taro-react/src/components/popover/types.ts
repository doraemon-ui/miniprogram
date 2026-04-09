import type { PopoverProps as NativePopoverProps, PopoverExpose as NativePopoverExpose } from '@doraemon-ui/miniprogram.popover'
import type { BasicComponent } from '@/types'

export interface PopoverProps extends NativePopoverProps, BasicComponent {}

export interface PopoverExpose extends NativePopoverExpose {}
