import { createHostComponent } from '@/hooks/hostComponent'
import type { SwitchProps, SwitchExpose } from './types'

export const Switch = createHostComponent<SwitchProps, SwitchExpose>('dora-switch')

Switch.displayName = 'DoraSwitch'
