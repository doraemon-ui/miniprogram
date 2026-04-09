import type { StepProps as NativeStepProps, StepExpose as NativeStepExpose } from '@doraemon-ui/miniprogram.steps'
import type { BasicComponent } from '@/types'

export interface StepProps extends NativeStepProps, BasicComponent {}

export interface StepExpose extends NativeStepExpose {}
