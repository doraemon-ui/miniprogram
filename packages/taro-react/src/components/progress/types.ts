import type { ProgressExpose as NativeProgressExpose, ProgressProps as NativeProgressProps } from '@doraemon-ui/miniprogram.progress'

import type { BasicComponent } from '../../types'

export interface ProgressProps extends NativeProgressProps, BasicComponent {}

export interface ProgressExpose extends NativeProgressExpose {}
