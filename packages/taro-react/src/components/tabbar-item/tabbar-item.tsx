import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { TabbarItemProps, TabbarItemExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
export const TabbarItem = createHostComponent<TabbarItemProps, TabbarItemExpose>('dora-tabbar-item',
{
  prefixCls: 'dora-tabbar-item',
  tabKey: '',
  title: '',
  disabled: false,
})

TabbarItem.displayName = 'DoraTabbarItem'

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-tabbar-item', {
  prefixCls: '',
  tabKey: '',
  title: '',
  disabled: '',
  onClick: '',
})
