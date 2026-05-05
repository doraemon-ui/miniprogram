import { createHostComponent } from '../../hooks/hostComponent'
import type { GridProps, GridExpose } from './types'

export const Grid = createHostComponent<GridProps, GridExpose>('dora-grid',
{
  prefixCls: 'dora-grid',
  disabled: false,
  hoverClass: 'default',
  wrapStyle: null,
})

Grid.displayName = 'DoraGrid'
