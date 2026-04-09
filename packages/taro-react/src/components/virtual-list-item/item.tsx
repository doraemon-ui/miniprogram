import { createHostComponent } from '@/hooks/hostComponent'
import type { VirtualListItemProps, VirtualListItemExpose } from './types'

export const VirtualListItem = createHostComponent<VirtualListItemProps, VirtualListItemExpose>('dora-virtual-list-item')

VirtualListItem.displayName = 'DoraVirtualListItem'
