import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { SwipeActionProps, SwipeActionExpose } from './types'

export const SwipeAction = createHostComponent<SwipeActionProps, SwipeActionExpose>('dora-swipe-action')

SwipeAction.displayName = 'DoraSwipeAction'

// Props registry for Taro WXML template generator
React.createElement('dora-swipe-action', {
  prefixCls: '',
  autoClose: false,
  disabled: false,
  left: [],
  right: [],
  useSlots: false,
  data: '',
  onClick: undefined,
  onOpen: undefined,
  onClose: undefined,
})
