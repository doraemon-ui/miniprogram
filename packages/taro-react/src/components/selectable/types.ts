import type { SelectableProps as NativeSelectableProps, SelectableExpose as NativeSelectableExpose } from '@doraemon-ui/miniprogram.selectable'
import type { BasicComponent } from '../../types'

export interface SelectableProps extends NativeSelectableProps, BasicComponent {
  onChange?: (event: any) => void
}

export interface SelectableExpose extends NativeSelectableExpose {}
