import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { IconProps, IconExpose } from './types'

export const Icon = createHostComponent<IconProps, IconExpose>('dora-icon')

Icon.displayName = 'DoraIcon'

// Props registry for Taro WXML template generator
React.createElement('dora-icon', {
  prefixCls: '',
  hidden: false,
  type: '',
  size: '',
  color: '',
  onClick: undefined,
})
