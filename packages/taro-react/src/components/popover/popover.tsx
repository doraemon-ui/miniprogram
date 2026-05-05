import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { PopoverProps, PopoverExpose } from './types'

export const Popover = createHostComponent<PopoverProps, PopoverExpose>('dora-popover')

Popover.displayName = 'DoraPopover'

// Props registry for Taro WXML template generator
React.createElement('dora-popover', {
  prefixCls: '',
  disabled: false,
  hoverClass: '',
  wrapStyle: {},
  onClick: undefined,
})
