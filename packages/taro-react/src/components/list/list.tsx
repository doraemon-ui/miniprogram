import { createHostComponent } from '@/hooks/hostComponent'
import type { ListProps, ListExpose } from './types'

export const List = createHostComponent<ListProps, ListExpose>('dora-list')

List.displayName = 'DoraList'
