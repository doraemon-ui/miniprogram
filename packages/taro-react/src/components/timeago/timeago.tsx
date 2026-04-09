import { createHostComponent } from '@/hooks/hostComponent'
import type { TimeagoProps, TimeagoExpose } from './types'

export const Timeago = createHostComponent<TimeagoProps, TimeagoExpose>('dora-timeago')

Timeago.displayName = 'DoraTimeago'
