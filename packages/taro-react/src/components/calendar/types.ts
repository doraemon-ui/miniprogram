import type { CalendarExpose as NativeCalendarExpose, CalendarProps as NativeCalendarProps } from '@doraemon-ui/miniprogram.calendar'

import type { BasicComponent } from '../../types'

export interface CalendarProps extends NativeCalendarProps, BasicComponent {}

export interface CalendarExpose extends NativeCalendarExpose {}
