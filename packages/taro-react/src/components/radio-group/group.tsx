import { createHostComponent } from '../../hooks/hostComponent'
import type { RadioGroupProps, RadioGroupExpose } from './types'

export const RadioGroup = createHostComponent<RadioGroupProps, RadioGroupExpose>('dora-radio-group',
{
  prefixCls: 'dora-radio-group',
  cellGroupPrefixCls: 'dora-list',
  value: '',
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
  iconPosition: 'right',
  iconSize: '',
  iconOn: '',
  iconOff: '',
})

RadioGroup.displayName = 'DoraRadioGroup'
