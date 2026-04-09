import { createHostComponent } from '@/hooks/hostComponent'
import type { CountupProps, CountupExpose } from './types'

export const Countup = createHostComponent<CountupProps, CountupExpose>('dora-countup')

Countup.displayName = 'DoraCountup'
