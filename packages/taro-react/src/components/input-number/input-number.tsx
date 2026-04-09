import { createHostComponent } from '@/hooks/hostComponent'
import type { InputNumberProps, InputNumberExpose } from './types'

export const InputNumber = createHostComponent<InputNumberProps, InputNumberExpose>('dora-input-number')

InputNumber.displayName = 'DoraInputNumber'
