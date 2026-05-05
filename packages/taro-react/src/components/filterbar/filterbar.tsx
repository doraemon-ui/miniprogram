import { createHostComponent } from '../../hooks/hostComponent'
import type { FilterbarProps, FilterbarExpose } from './types'

export const Filterbar = createHostComponent<FilterbarProps, FilterbarExpose>('dora-filterbar',
{
  prefixCls: 'dora-filterbar',
  disabled: false,
  hoverClass: 'default',
  wrapStyle: null,
})

Filterbar.displayName = 'DoraFilterbar'
