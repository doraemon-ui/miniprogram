import { createHostComponent } from '@/hooks/hostComponent'
import type { TimelineProps, TimelineExpose } from './types'

export const Timeline = createHostComponent<TimelineProps, TimelineExpose>('dora-timeline')

Timeline.displayName = 'DoraTimeline'
