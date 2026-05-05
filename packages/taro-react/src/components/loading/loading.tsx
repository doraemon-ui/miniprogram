import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { LoadingProps, LoadingExpose } from './types'

export const Loading = createHostComponent<LoadingProps, LoadingExpose>('dora-loading')

Loading.displayName = 'DoraLoading'

// Props registry for Taro WXML template generator
React.createElement('dora-loading', {
  prefixCls: '',
})
