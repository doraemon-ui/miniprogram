import { createHostComponent } from '@/hooks/hostComponent'
import type { CheckboxGroupProps, CheckboxGroupExpose } from './types'

export const CheckboxGroup = createHostComponent<CheckboxGroupProps, CheckboxGroupExpose>('dora-checkbox-group')

CheckboxGroup.displayName = 'DoraCheckboxGroup'
