import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { SkeletonProps, SkeletonExpose } from './types'

export const Skeleton = createHostComponent<SkeletonProps, SkeletonExpose>('dora-skeleton')

Skeleton.displayName = 'DoraSkeleton'

// Props registry for Taro WXML template generator
React.createElement('dora-skeleton', {
  prefixCls: '',
  active: false,
})
