import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { EllipsisProps, EllipsisExpose } from './types'

export const Ellipsis = createHostComponent<EllipsisProps, EllipsisExpose>('dora-ellipsis')

Ellipsis.displayName = 'DoraEllipsis'

// Props registry for Taro WXML template generator
React.createElement('dora-ellipsis', {
  prefixCls: '',
  content: '',
  direction: '',
  defaultExpanded: false,
  expandText: '',
  collapseText: '',
  rows: 0,
  onClick: undefined,
})
