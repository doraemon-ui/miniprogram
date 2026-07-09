import type { StepExpose as NativeStepExpose, StepProps as NativeStepProps } from '@doraemon-ui/miniprogram.steps'

import type { BasicComponent } from '../../types'

export interface StepProps extends NativeStepProps, BasicComponent {}

export interface StepExpose extends NativeStepExpose {}
