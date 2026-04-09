import type {
  PopupSelectProps as NativePopupSelectProps,
  PopupSelectExpose as NativePopupSelectExpose,
} from '@doraemon-ui/miniprogram.popup-select'
import type { BasicComponent } from '@/types'

export interface PopupSelectProps extends NativePopupSelectProps, BasicComponent {}

export interface PopupSelectExpose extends NativePopupSelectExpose {}
