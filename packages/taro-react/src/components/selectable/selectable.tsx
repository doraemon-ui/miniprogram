import { createHostComponent } from '../../hooks/hostComponent'
import type { SelectableProps, SelectableExpose } from './types'

export const Selectable = createHostComponent<SelectableProps, SelectableExpose>('dora-selectable',
{
  prefixCls: 'dora-selectable',
  type: 'checkbox',
  value: '',
  defaultChecked: false,
  checked: false,
  disabled: false,
  readOnly: false,
  color: 'balanced',
  controlled: false,
  wrapStyle: null,
  iconSize: '',
  iconOn: '',
  iconOff: '',
})

Selectable.displayName = 'DoraSelectable'
