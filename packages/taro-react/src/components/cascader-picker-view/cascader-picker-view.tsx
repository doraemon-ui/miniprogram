import { createHostComponent } from '@/hooks/hostComponent'
import type { CascaderPickerViewProps, CascaderPickerViewExpose } from './types'

export const CascaderPickerView = createHostComponent<CascaderPickerViewProps, CascaderPickerViewExpose>('dora-cascader-picker-view')

CascaderPickerView.displayName = 'DoraCascaderPickerView'
