import { createHostComponent } from '@/hooks/hostComponent'
import type { IndexItemProps, IndexItemExpose } from './types'

export const IndexItem = createHostComponent<IndexItemProps, IndexItemExpose>('dora-index-item')

IndexItem.displayName = 'DoraIndexItem'
