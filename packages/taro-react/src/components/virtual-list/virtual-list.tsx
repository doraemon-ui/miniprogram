import { createHostComponent } from '@/hooks/hostComponent'
import type { VirtualListProps, VirtualListExpose } from './types'

export const VirtualList = createHostComponent<VirtualListProps, VirtualListExpose>('dora-virtual-list')

VirtualList.displayName = 'DoraVirtualList'
