import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { SkeletonParagraphProps, SkeletonParagraphExpose } from './types'

export const SkeletonParagraph = createHostComponent<SkeletonParagraphProps, SkeletonParagraphExpose>('dora-skeleton-paragraph')

SkeletonParagraph.displayName = 'DoraSkeletonParagraph'

// Props registry for Taro WXML template generator
React.createElement('dora-skeleton-paragraph', {
  prefixCls: '',
  rows: 0,
  rounded: false,
  active: false,
})
