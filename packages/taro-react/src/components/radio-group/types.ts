import type { RadioGroupExpose as NativeRadioGroupExpose, RadioGroupProps as NativeRadioGroupProps } from '@doraemon-ui/miniprogram.radio'

import type { BasicComponent } from '../../types'

export interface RadioGroupProps extends NativeRadioGroupProps, BasicComponent {
  onChange?: (event: any) => void
}

export interface RadioGroupExpose extends NativeRadioGroupExpose {}
