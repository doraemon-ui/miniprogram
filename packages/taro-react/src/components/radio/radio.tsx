import { createHostComponent } from '../../hooks/hostComponent'
import type { RadioProps, RadioExpose } from './types'

export const Radio = createHostComponent<RadioProps, RadioExpose>('dora-radio',
{
  prefixCls: 'dora-radio',
  cellPrefixCls: 'dora-list-item',
  selectablePrefixCls: 'dora-selectable',
  thumb: '',
  title: '',
  label: '',
  value: '',
  checked: false,
  disabled: false,
  readOnly: false,
  color: 'balanced',
  wrapStyle: null,
  hasLine: true,
})

Radio.displayName = 'DoraRadio'
