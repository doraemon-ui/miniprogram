import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { SliderProps, SliderExpose } from './types'

export const Slider = createHostComponent<SliderProps, SliderExpose>('dora-slider')

Slider.displayName = 'DoraSlider'

// Props registry for Taro WXML template generator
React.createElement('dora-slider', {
  prefixCls: '',
  min: 0,
  max: 0,
  step: 0,
  defaultValue: [],
  value: [],
  controlled: false,
  disabled: false,
  showMark: false,
  showValue: '',
  tipFormatter: '',
  markStyle: '',
  handleStyle: '',
  trackStyle: '',
  railStyle: '',
  wrapStyle: '',
  onChange: undefined,
  onAfterChange: undefined,
})
