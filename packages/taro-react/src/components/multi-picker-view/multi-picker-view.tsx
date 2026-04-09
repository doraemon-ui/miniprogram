import { createHostComponent } from '@/hooks/hostComponent'
import type { MultiPickerViewProps, MultiPickerViewExpose } from './types'

export const MultiPickerView = createHostComponent<MultiPickerViewProps, MultiPickerViewExpose>('dora-multi-picker-view')

MultiPickerView.displayName = 'DoraMultiPickerView'
