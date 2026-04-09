import type {
  TimelineItemProps as NativeTimelineItemProps,
  TimelineItemExpose as NativeTimelineItemExpose,
} from '@doraemon-ui/miniprogram.timeline'
import type { BasicComponent } from '@/types'

export interface TimelineItemProps extends NativeTimelineItemProps, BasicComponent {}

export interface TimelineItemExpose extends NativeTimelineItemExpose {}
