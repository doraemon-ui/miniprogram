import { createHostComponent } from '../../hooks/hostComponent'
import type { EllipsisProps, EllipsisExpose } from './types'

export const Ellipsis = createHostComponent<EllipsisProps, EllipsisExpose>('dora-ellipsis',
{
  prefixCls: 'dora-ellipsis',
  content: '',
  direction: 'end',
  defaultExpanded: false,
  expandText: '',
  collapseText: '',
  rows: 1,
})

Ellipsis.displayName = 'DoraEllipsis'
