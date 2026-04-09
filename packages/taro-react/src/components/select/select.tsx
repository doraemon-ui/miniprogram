import { createHostComponent } from '@/hooks/hostComponent'
import type { SelectProps, SelectExpose } from './types'

export const Select = createHostComponent<SelectProps, SelectExpose>('dora-select')

Select.displayName = 'DoraSelect'
