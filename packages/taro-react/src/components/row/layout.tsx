import { createHostComponent } from '../../hooks/hostComponent'
import type { RowProps, RowExpose } from './types'

export const Row = createHostComponent<RowProps, RowExpose>('dora-row',
{
  prefixCls: 'dora-row',
  gutter: 0,
})

Row.displayName = 'DoraRow'
