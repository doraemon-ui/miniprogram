import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { TabbarItemProps, TabbarItemExpose } from './types'

export const TabbarItem = createHostComponent<TabbarItemProps, TabbarItemExpose>('dora-tabbar-item')

TabbarItem.displayName = 'DoraTabbarItem'

// Props registry for Taro WXML template generator
React.createElement('dora-tabbar-item', {
  prefixCls: '',
  tabKey: '',
  title: '',
  disabled: false,
  onClick: undefined,
})
