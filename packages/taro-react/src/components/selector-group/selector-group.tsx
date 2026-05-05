import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { SelectorGroupProps, SelectorGroupExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
export const SelectorGroup = createHostComponent<SelectorGroupProps, SelectorGroupExpose>('dora-selector-group',
{
  prefixCls: 'dora-selector-group',
  theme: 'balanced',
  shape: 'default',
  columns: 3,
  gap: 8,
  options: [],
  defaultValue: [],
  value: [],
  controlled: false,
  multiple: false,
  showCheckMark: true,
  defaultFieldNames: { label: 'label', value: 'value', disabled: 'disabled' },
})

SelectorGroup.displayName = 'DoraSelectorGroup'

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-selector-group', {
  prefixCls: '',
  theme: '',
  shape: '',
  columns: '',
  gap: '',
  options: '',
  defaultValue: '',
  value: '',
  controlled: '',
  multiple: '',
  showCheckMark: '',
  defaultFieldNames: '',
  onChange: '',
})
