import { createHostComponent } from '@/hooks/hostComponent'
import type { IndexProps, IndexExpose } from './types'

export const Index = createHostComponent<IndexProps, IndexExpose>('dora-index')

Index.displayName = 'DoraIndex'
