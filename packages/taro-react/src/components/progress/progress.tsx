import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { ProgressProps, ProgressExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
export const Progress = createHostComponent<ProgressProps, ProgressExpose>('dora-progress',
{
  prefixCls: 'dora-progress',
  percent: 0,
  strokeWidth: 10,
  activeColor: '',
  backgroundColor: '#f3f3f3',
  status: 'normal',
  shape: 'round',
  barStyle: null,
  showInfo: false,
})

Progress.displayName = 'DoraProgress'

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-progress', {
  prefixCls: '',
  percent: '',
  strokeWidth: '',
  activeColor: '',
  backgroundColor: '',
  status: '',
  shape: '',
  barStyle: '',
  showInfo: '',
})
