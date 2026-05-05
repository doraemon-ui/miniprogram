import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { TabProps, TabExpose } from './types'

export const Tab = createHostComponent<TabProps, TabExpose>('dora-tab')

Tab.displayName = 'DoraTab'

// Props registry for Taro WXML template generator
React.createElement('dora-tab', {
  prefixCls: '',
  key: '',
  title: '',
  disabled: false,
  onClick: undefined,
})
