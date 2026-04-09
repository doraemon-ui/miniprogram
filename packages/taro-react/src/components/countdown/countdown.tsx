import { createHostComponent } from '@/hooks/hostComponent'
import type { CountdownProps, CountdownExpose } from './types'

export const Countdown = createHostComponent<CountdownProps, CountdownExpose>('dora-countdown')

Countdown.displayName = 'DoraCountdown'
