import { createHostComponent } from '../../hooks/hostComponent'
import type { PopoverProps, PopoverExpose } from './types'

export const Popover = createHostComponent<PopoverProps, PopoverExpose>('dora-popover',
{
  prefixCls: 'dora-popover',
  disabled: false,
  hoverClass: 'default',
  wrapStyle: null,
})

Popover.displayName = 'DoraPopover'
