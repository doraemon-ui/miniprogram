import { createHostComponent } from '../../hooks/hostComponent'
import type { CheckboxProps, CheckboxExpose } from './types'

export const Checkbox = createHostComponent<CheckboxProps, CheckboxExpose>('dora-checkbox',
{
  prefixCls: 'dora-checkbox',
  cellPrefixCls: 'dora-list-item',
  selectablePrefixCls: 'dora-selectable',
  title: '',
  label: '',
  extra: '',
  value: '',
  checked: false,
  disabled: false,
  readOnly: false,
  color: 'balanced',
  wrapStyle: null,
  hasLine: true,
})

Checkbox.displayName = 'DoraCheckbox'
