import type { CalendarProps as NativeCalendarProps, CalendarExpose as NativeCalendarExpose } from '@doraemon-ui/miniprogram.calendar'
import type { BasicComponent } from '@/types'

export interface CalendarProps extends NativeCalendarProps, BasicComponent {}

export interface CalendarExpose extends NativeCalendarExpose {}
