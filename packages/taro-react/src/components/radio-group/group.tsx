import { createHostComponent } from '@/hooks/hostComponent'
import type { RadioGroupProps, RadioGroupExpose } from './types'

export const RadioGroup = createHostComponent<RadioGroupProps, RadioGroupExpose>('dora-radio-group')

RadioGroup.displayName = 'DoraRadioGroup'
