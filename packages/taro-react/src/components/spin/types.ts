import type { SpinExpose as NativeSpinExpose, SpinProps as NativeSpinProps } from '@doraemon-ui/miniprogram.spin'

import type { BasicComponent } from '../../types'

export interface SpinProps extends NativeSpinProps, BasicComponent {}

export interface SpinExpose extends NativeSpinExpose {}
