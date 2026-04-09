import type { SliderProps as NativeSliderProps, SliderExpose as NativeSliderExpose } from '@doraemon-ui/miniprogram.slider'
import type { BasicComponent } from '@/types'

export interface SliderProps extends NativeSliderProps, BasicComponent {}

export interface SliderExpose extends NativeSliderExpose {}
