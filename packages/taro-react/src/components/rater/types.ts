import type { RaterProps as NativeRaterProps, RaterExpose as NativeRaterExpose } from '@doraemon-ui/miniprogram.rater'
import type { BasicComponent } from '@/types'

export interface RaterProps extends NativeRaterProps, BasicComponent {}

export interface RaterExpose extends NativeRaterExpose {}
