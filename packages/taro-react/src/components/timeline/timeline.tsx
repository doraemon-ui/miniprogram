import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { TimelineProps, TimelineExpose } from './types'

export const Timeline = createHostComponent<TimelineProps, TimelineExpose>('dora-timeline')

Timeline.displayName = 'DoraTimeline'

// Props registry for Taro WXML template generator
React.createElement('dora-timeline', {
  prefixCls: '',
  pending: false,
  position: '',
})
