import { createHostComponent } from '../../hooks/hostComponent'
import type { SliderProps, SliderExpose } from './types'

export const Slider = createHostComponent<SliderProps, SliderExpose>('dora-slider',
{
  prefixCls: 'dora-slider',
  min: 0,
  max: 100,
  step: 1,
  defaultValue: [0],
  value: [0],
  controlled: false,
  disabled: false,
  showMark: false,
  showValue: false,
  tipFormatter: '{d}',
  markStyle: null,
  handleStyle: null,
  trackStyle: null,
  railStyle: null,
  wrapStyle: null,
})

Slider.displayName = 'DoraSlider'
