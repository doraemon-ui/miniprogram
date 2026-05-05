import { createHostComponent } from '../../hooks/hostComponent'
import type { StickyProps, StickyExpose } from './types'

export const Sticky = createHostComponent<StickyProps, StickyExpose>('dora-sticky',
{
  prefixCls: 'dora-sticky',
  disabled: false,
  hoverClass: 'default',
  wrapStyle: null,
})

Sticky.displayName = 'DoraSticky'
