import { createHostComponent } from '../../hooks/hostComponent'
import type { SwitchProps, SwitchExpose } from './types'

export const Switch = createHostComponent<SwitchProps, SwitchExpose>('dora-switch',
{
  prefixCls: 'dora-switch',
  value: false,
  disabled: false,
  loading: false,
  color: 'balanced',
  checkedText: '',
  uncheckedText: '',
})

Switch.displayName = 'DoraSwitch'
