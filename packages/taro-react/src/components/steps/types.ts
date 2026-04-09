import type { StepsProps as NativeStepsProps, StepsExpose as NativeStepsExpose } from '@doraemon-ui/miniprogram.steps'
import type { BasicComponent } from '@/types'

export interface StepsProps extends NativeStepsProps, BasicComponent {}

export interface StepsExpose extends NativeStepsExpose {}
