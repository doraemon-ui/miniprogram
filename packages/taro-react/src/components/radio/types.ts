import type { RadioExpose as NativeRadioExpose, RadioProps as NativeRadioProps } from '@doraemon-ui/miniprogram.radio'

import type { BasicComponent } from '../../types'

export interface RadioProps extends NativeRadioProps, BasicComponent {
  onChange?: (event: any) => void
}

export interface RadioExpose extends NativeRadioExpose {}
