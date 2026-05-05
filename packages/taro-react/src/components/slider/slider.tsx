import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { SliderProps, SliderExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
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

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-slider', {
  prefixCls: '',
  min: '',
  max: '',
  step: '',
  defaultValue: '',
  value: '',
  controlled: '',
  disabled: '',
  showMark: '',
  showValue: '',
  tipFormatter: '',
  markStyle: '',
  handleStyle: '',
  trackStyle: '',
  railStyle: '',
  wrapStyle: '',
  onChange: '',
  onAfterChange: '',
})
