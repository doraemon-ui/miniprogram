import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { SafeAreaProps, SafeAreaExpose } from './types'

export const SafeArea = createHostComponent<SafeAreaProps, SafeAreaExpose>('dora-safe-area')

SafeArea.displayName = 'DoraSafeArea'

// Props registry for Taro WXML template generator
React.createElement('dora-safe-area', {
  prefixCls: '',
  safeArea: '',
  safeAreaStyle: '',
  forceRender: false,
  supports: false,
  wrapStyle: {},
})
