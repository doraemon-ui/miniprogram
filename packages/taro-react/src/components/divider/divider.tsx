import { createHostComponent } from '@/hooks/hostComponent'
import type { DividerProps, DividerExpose } from './types'

export const Divider = createHostComponent<DividerProps, DividerExpose>('dora-divider')

Divider.displayName = 'DoraDivider'
