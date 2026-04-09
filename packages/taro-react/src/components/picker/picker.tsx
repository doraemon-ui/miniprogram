import { createHostComponent } from '@/hooks/hostComponent'
import type { PickerProps, PickerExpose } from './types'

export const Picker = createHostComponent<PickerProps, PickerExpose>('dora-picker')

Picker.displayName = 'DoraPicker'
