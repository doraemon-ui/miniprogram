import { createHostComponent } from '@/hooks/hostComponent'
import type { CheckboxProps, CheckboxExpose } from './types'

export const Checkbox = createHostComponent<CheckboxProps, CheckboxExpose>('dora-checkbox')

Checkbox.displayName = 'DoraCheckbox'
