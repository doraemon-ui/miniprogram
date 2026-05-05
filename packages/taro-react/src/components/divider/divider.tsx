import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { DividerProps, DividerExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
export const Divider = createHostComponent<DividerProps, DividerExpose>('dora-divider',
{
  prefixCls: 'dora-divider',
  position: 'center',
  dashed: false,
  text: '',
  showText: true,
  direction: 'horizontal',
})

Divider.displayName = 'DoraDivider'

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-divider', {
  prefixCls: '',
  position: '',
  dashed: '',
  text: '',
  showText: '',
  direction: '',
})
