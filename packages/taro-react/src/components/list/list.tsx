import { createHostComponent } from '../../hooks/hostComponent'
import type { ListProps, ListExpose } from './types'

export const List = createHostComponent<ListProps, ListExpose>('dora-list',
{
  prefixCls: 'dora-list',
  title: '',
  label: '',
  mode: 'default',
  hasLine: true,
  wrapStyle: null,
  bodyStyle: null,
})

List.displayName = 'DoraList'
