import { createHostComponent } from '@/hooks/hostComponent'
import type { ListItemProps, ListItemExpose } from './types'

export const ListItem = createHostComponent<ListItemProps, ListItemExpose>('dora-list-item')

ListItem.displayName = 'DoraListItem'
