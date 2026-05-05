import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { ToptipsProps, ToptipsExpose } from './types'

export const Toptips = createHostComponent<ToptipsProps, ToptipsExpose>('dora-toptips')

Toptips.displayName = 'DoraToptips'

// Props registry for Taro WXML template generator
React.createElement('dora-toptips', {
  prefixCls: '',
  classNames: '',
  icon: '',
  hidden: false,
  text: '',
  duration: 0,
})
