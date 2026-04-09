import type { PopupProps as NativePopupProps, PopupExpose as NativePopupExpose } from '@doraemon-ui/miniprogram.popup'
import type { BasicComponent } from '@/types'

export interface PopupProps extends NativePopupProps, BasicComponent {}

export interface PopupExpose extends NativePopupExpose {}
