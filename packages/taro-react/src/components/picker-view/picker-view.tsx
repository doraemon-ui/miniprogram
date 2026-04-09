import { createHostComponent } from '@/hooks/hostComponent'
import type { PickerViewProps, PickerViewExpose } from './types'

export const PickerView = createHostComponent<PickerViewProps, PickerViewExpose>('dora-picker-view')

PickerView.displayName = 'DoraPickerView'
