import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { TabbarProps, TabbarExpose } from './types'

export const Tabbar = createHostComponent<TabbarProps, TabbarExpose>('dora-tabbar')

Tabbar.displayName = 'DoraTabbar'

// Props registry for Taro WXML template generator
React.createElement('dora-tabbar', {
  prefixCls: '',
  defaultCurrent: '',
  current: '',
  controlled: false,
  theme: '',
  backgroundColor: '',
  position: '',
  safeArea: '',
  onChange: undefined,
})
