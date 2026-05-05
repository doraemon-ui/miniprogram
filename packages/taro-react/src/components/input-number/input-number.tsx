import { createHostComponent } from '../../hooks/hostComponent'
import type { InputNumberProps, InputNumberExpose } from './types'

export const InputNumber = createHostComponent<InputNumberProps, InputNumberExpose>('dora-input-number',
{
  prefixCls: 'dora-input-number',
  shape: 'square',
  min: 0,
  max: 0,
  step: 1,
  defaultValue: 0,
  value: 0,
  disabled: true,
  readOnly: false,
  longpress: false,
  color: 'balanced',
  controlled: false,
  digits: -1,
})

InputNumber.displayName = 'DoraInputNumber'
