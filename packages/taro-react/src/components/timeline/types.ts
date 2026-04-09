import type { TimelineProps as NativeTimelineProps, TimelineExpose as NativeTimelineExpose } from '@doraemon-ui/miniprogram.timeline'
import type { BasicComponent } from '@/types'

export interface TimelineProps extends NativeTimelineProps, BasicComponent {}

export interface TimelineExpose extends NativeTimelineExpose {}
