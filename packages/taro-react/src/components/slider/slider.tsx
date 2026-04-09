import { createHostComponent } from '@/hooks/hostComponent'
import type { SliderProps, SliderExpose } from './types'

export const Slider = createHostComponent<SliderProps, SliderExpose>('dora-slider')

Slider.displayName = 'DoraSlider'
