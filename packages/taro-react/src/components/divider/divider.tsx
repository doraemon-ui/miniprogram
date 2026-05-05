import { createHostComponent } from '../../hooks/hostComponent'
import type { DividerProps, DividerExpose } from './types'

export const Divider = createHostComponent<DividerProps, DividerExpose>('dora-divider',
{
  prefixCls: 'dora-divider',
  position: 'center',
  dashed: false,
  text: '',
  showText: true,
  direction: 'horizontal',
})

Divider.displayName = 'DoraDivider'
