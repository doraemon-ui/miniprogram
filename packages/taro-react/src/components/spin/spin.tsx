import { createHostComponent } from '@/hooks/hostComponent'
import type { SpinProps, SpinExpose } from './types'

export const Spin = createHostComponent<SpinProps, SpinExpose>('dora-spin')

Spin.displayName = 'DoraSpin'
