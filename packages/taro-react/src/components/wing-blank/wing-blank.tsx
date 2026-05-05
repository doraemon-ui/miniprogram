import { createHostComponent } from '../../hooks/hostComponent'
import type { WingBlankProps, WingBlankExpose } from './types'

export const WingBlank = createHostComponent<WingBlankProps, WingBlankExpose>('dora-wing-blank',
{
  prefixCls: 'dora-wing-blank',
  size: 'default',
  bodyStyle: null,
})

WingBlank.displayName = 'DoraWingBlank'
