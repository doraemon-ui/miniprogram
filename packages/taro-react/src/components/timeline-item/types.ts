import type { TimelineItemExpose as NativeTimelineItemExpose, TimelineItemProps as NativeTimelineItemProps } from '@doraemon-ui/miniprogram.timeline'

import type { BasicComponent } from '../../types'

export interface TimelineItemProps extends NativeTimelineItemProps, BasicComponent {}

export interface TimelineItemExpose extends NativeTimelineItemExpose {}
