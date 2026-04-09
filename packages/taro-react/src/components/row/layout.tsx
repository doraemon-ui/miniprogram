import { createHostComponent } from '@/hooks/hostComponent'
import type { RowProps, RowExpose } from './types'

export const Row = createHostComponent<RowProps, RowExpose>('dora-row')

Row.displayName = 'DoraRow'
