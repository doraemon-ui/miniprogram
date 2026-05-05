import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { TimelineItemProps, TimelineItemExpose } from './types'

export const TimelineItem = createHostComponent<TimelineItemProps, TimelineItemExpose>('dora-timeline-item')

TimelineItem.displayName = 'DoraTimelineItem'

// Props registry for Taro WXML template generator
React.createElement('dora-timeline-item', {
  prefixCls: '',
  content: '',
  dotStyle: null,
  custom: false,
})
