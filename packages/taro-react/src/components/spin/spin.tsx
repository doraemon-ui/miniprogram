import { createHostComponent } from '../../hooks/hostComponent'
import type { SpinProps, SpinExpose } from './types'

export const Spin = createHostComponent<SpinProps, SpinExpose>('dora-spin',
{
  prefixCls: 'dora-spin',
  classNames: 'dora-animate--fadeIn',
  tip: '',
  size: 'default',
  spinning: true,
  nested: false,
  spinColor: 'default',
})

Spin.displayName = 'DoraSpin'
