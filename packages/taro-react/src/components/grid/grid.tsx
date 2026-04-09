import { createHostComponent } from '@/hooks/hostComponent'
import type { GridProps, GridExpose } from './types'

export const Grid = createHostComponent<GridProps, GridExpose>('dora-grid')

Grid.displayName = 'DoraGrid'
