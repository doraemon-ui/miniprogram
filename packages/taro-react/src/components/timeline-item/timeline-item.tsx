import { createHostComponent } from '@/hooks/hostComponent'
import type { TimelineItemProps, TimelineItemExpose } from './types'

export const TimelineItem = createHostComponent<TimelineItemProps, TimelineItemExpose>('dora-timeline-item')

TimelineItem.displayName = 'DoraTimelineItem'
