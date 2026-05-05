import { createHostComponent } from '../../hooks/hostComponent'
import type { CheckboxGroupProps, CheckboxGroupExpose } from './types'

export const CheckboxGroup = createHostComponent<CheckboxGroupProps, CheckboxGroupExpose>('dora-checkbox-group',
{
  prefixCls: 'dora-checkbox-group',
  cellGroupPrefixCls: 'dora-list',
  value: [],
  name: '',
  title: '',
  label: '',
  options: [],
  disabled: false,
  readOnly: false,
  mode: 'default',
  bodyStyle: null,
  hasLine: true,
  withListComponent: true,
  iconPosition: 'left',
  iconSize: '',
  iconOn: '',
  iconOff: '',
})

CheckboxGroup.displayName = 'DoraCheckboxGroup'
