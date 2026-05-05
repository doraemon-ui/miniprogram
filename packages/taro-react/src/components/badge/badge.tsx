import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { BadgeProps, BadgeExpose } from './types'

export const Badge = createHostComponent<BadgeProps, BadgeExpose>('dora-badge')

Badge.displayName = 'DoraBadge'

// Props registry for Taro WXML template generator
React.createElement('dora-badge', {
  prefixCls: '',
  count: 0,
  overflowCount: 0,
  dot: false,
  showZero: false,
  status: '',
  text: '',
  position: '',
  backgroundColor: '',
  hideShadow: false,
  title: '',
})
