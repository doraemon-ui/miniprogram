import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { TabsProps, TabsExpose } from './types'

export const Tabs = createHostComponent<TabsProps, TabsExpose>('dora-tabs')

Tabs.displayName = 'DoraTabs'

// Props registry for Taro WXML template generator
React.createElement('dora-tabs', {
  prefixCls: '',
  defaultCurrent: '',
  current: '',
  scroll: false,
  controlled: false,
  theme: '',
  direction: '',
  justify: '',
  activeLineMode: '',
  onChange: undefined,
})
