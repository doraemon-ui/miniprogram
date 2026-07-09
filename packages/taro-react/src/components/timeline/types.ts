import type { TimelineExpose as NativeTimelineExpose, TimelineProps as NativeTimelineProps } from '@doraemon-ui/miniprogram.timeline'

import type { BasicComponent } from '../../types'

export interface TimelineProps extends NativeTimelineProps, BasicComponent {}

export interface TimelineExpose extends NativeTimelineExpose {}
