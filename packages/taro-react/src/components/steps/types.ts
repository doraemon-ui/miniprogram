import type { StepsExpose as NativeStepsExpose, StepsProps as NativeStepsProps } from '@doraemon-ui/miniprogram.steps'

import type { BasicComponent } from '../../types'

export interface StepsProps extends NativeStepsProps, BasicComponent {}

export interface StepsExpose extends NativeStepsExpose {}
