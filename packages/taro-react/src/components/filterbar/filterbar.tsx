import { createHostComponent } from '@/hooks/hostComponent'
import type { FilterbarProps, FilterbarExpose } from './types'

export const Filterbar = createHostComponent<FilterbarProps, FilterbarExpose>('dora-filterbar')

Filterbar.displayName = 'DoraFilterbar'
