import type { SearchBarProps as NativeSearchBarProps, SearchBarExpose as NativeSearchBarExpose } from '@doraemon-ui/miniprogram.search-bar'
import type { BasicComponent } from '../../types'

export interface SearchBarProps extends NativeSearchBarProps, BasicComponent {
  onChange?: (event: any) => void
  onFocus?: (event: any) => void
  onBlur?: (event: any) => void
  onConfirm?: (event: any) => void
  onClear?: (event: any) => void
  onCancel?: (event: any) => void
}

export interface SearchBarExpose extends NativeSearchBarExpose {}
