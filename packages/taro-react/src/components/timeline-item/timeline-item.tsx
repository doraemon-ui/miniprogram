import { createHostComponent } from '../../hooks/hostComponent'
import type { TimelineItemProps, TimelineItemExpose } from './types'

export const TimelineItem = createHostComponent<TimelineItemProps, TimelineItemExpose>('dora-timeline-item',
{
  prefixCls: 'dora-timeline-item',
  content: '',
  dotStyle: null,
  custom: false,
})

TimelineItem.displayName = 'DoraTimelineItem'
