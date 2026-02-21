import { createHostComponent } from '../../hostComponent'

import type { ListItemProps, ListItemExpose } from './types'

export const ListItem = createHostComponent<ListItemProps, ListItemExpose>('dora-list-item')
