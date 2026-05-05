import { createHostComponent } from '../../hooks/hostComponent'
import type { TimelineProps, TimelineExpose } from './types'

export const Timeline = createHostComponent<TimelineProps, TimelineExpose>('dora-timeline',
{
  prefixCls: 'dora-timeline',
  pending: false,
  position: 'left',
})

Timeline.displayName = 'DoraTimeline'
