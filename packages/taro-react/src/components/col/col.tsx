import { createHostComponent } from '@/hooks/hostComponent'
import type { ColProps, ColExpose } from './types'

export const Col = createHostComponent<ColProps, ColExpose>('dora-col')

Col.displayName = 'DoraCol'
