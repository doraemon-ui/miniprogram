import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { TabbarProps, TabbarExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
export const Tabbar = createHostComponent<TabbarProps, TabbarExpose>('dora-tabbar',
{
  prefixCls: 'dora-tabbar',
  defaultCurrent: '',
  current: '',
  controlled: false,
  theme: 'balanced',
  backgroundColor: '#fff',
  position: '',
  safeArea: false,
})

Tabbar.displayName = 'DoraTabbar'

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-tabbar', {
  prefixCls: '',
  defaultCurrent: '',
  current: '',
  controlled: '',
  theme: '',
  backgroundColor: '',
  position: '',
  safeArea: '',
  onChange: '',
})
