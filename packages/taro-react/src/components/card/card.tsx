import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { CardProps, CardExpose } from './types'

export const Card = createHostComponent<CardProps, CardExpose>('dora-card')

Card.displayName = 'DoraCard'

// Props registry for Taro WXML template generator
React.createElement('dora-card', {
  prefixCls: '',
  hoverClass: '',
  bordered: false,
  full: false,
  title: '',
  thumb: '',
  thumbStyle: '',
  extra: '',
  actions: [],
  onAction: undefined,
})
