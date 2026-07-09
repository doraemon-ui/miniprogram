import type { SliderExpose as NativeSliderExpose, SliderProps as NativeSliderProps } from '@doraemon-ui/miniprogram.slider'

import type { BasicComponent } from '../../types'

export interface SliderProps extends NativeSliderProps, BasicComponent {
  onChange?: (event: any) => void
  onAfterChange?: (event: any) => void
}

export interface SliderExpose extends NativeSliderExpose {}
