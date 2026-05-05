import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { ListProps, ListExpose } from './types'

export const List = createHostComponent<ListProps, ListExpose>('dora-list')

List.displayName = 'DoraList'

// Props registry for Taro WXML template generator
React.createElement('dora-list', {
  prefixCls: '',
  title: '',
  label: '',
  mode: 'default',
  hasLine: false,
  wrapStyle: {},
  bodyStyle: {},
})
