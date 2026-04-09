import type { ProgressProps as NativeProgressProps, ProgressExpose as NativeProgressExpose } from '@doraemon-ui/miniprogram.progress'
import type { BasicComponent } from '@/types'

export interface ProgressProps extends NativeProgressProps, BasicComponent {}

export interface ProgressExpose extends NativeProgressExpose {}
