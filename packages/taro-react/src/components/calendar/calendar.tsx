import { createHostComponent } from '@/hooks/hostComponent'
import type { CalendarProps, CalendarExpose } from './types'

export const Calendar = createHostComponent<CalendarProps, CalendarExpose>('dora-calendar')

Calendar.displayName = 'DoraCalendar'
