import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { SegmentedControlProps, SegmentedControlExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
export const SegmentedControl = createHostComponent<SegmentedControlProps, SegmentedControlExpose>('dora-segmented-control',
{
  prefixCls: 'dora-segmented-control',
  theme: 'balanced',
  defaultCurrent: 0,
  current: 0,
  values: [],
  disabled: false,
  controlled: false,
})

SegmentedControl.displayName = 'DoraSegmentedControl'

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-segmented-control', {
  prefixCls: '',
  theme: '',
  defaultCurrent: '',
  current: '',
  values: '',
  disabled: '',
  controlled: '',
  onChange: '',
})
