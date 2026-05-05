import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { TabsProps, TabsExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
export const Tabs = createHostComponent<TabsProps, TabsExpose>('dora-tabs',
{
  prefixCls: 'dora-tabs',
  defaultCurrent: '',
  current: '',
  scroll: false,
  controlled: false,
  theme: 'balanced',
  direction: 'horizontal',
  justify: 'space-around',
  activeLineMode: 'auto',
})

Tabs.displayName = 'DoraTabs'

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-tabs', {
  prefixCls: '',
  defaultCurrent: '',
  current: '',
  scroll: '',
  controlled: '',
  theme: '',
  direction: '',
  justify: '',
  activeLineMode: '',
  onChange: '',
})
