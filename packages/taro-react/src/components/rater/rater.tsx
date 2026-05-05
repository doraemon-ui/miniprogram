import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { RaterProps, RaterExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
export const Rater = createHostComponent<RaterProps, RaterExpose>('dora-rater',
{
  prefixCls: 'dora-rater',
  max: 5,
  icon: '',
  star: '★',
  defaultValue: 0,
  value: 0,
  activeColor: '#ffc900',
  margin: 2,
  fontSize: 25,
  disabled: false,
  allowHalf: false,
  allowClear: false,
  allowTouchMove: false,
  controlled: false,
})

Rater.displayName = 'DoraRater'

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-rater', {
  prefixCls: '',
  max: '',
  icon: '',
  star: '',
  defaultValue: '',
  value: '',
  activeColor: '',
  margin: '',
  fontSize: '',
  disabled: '',
  allowHalf: '',
  allowClear: '',
  allowTouchMove: '',
  controlled: '',
  onChange: '',
})
