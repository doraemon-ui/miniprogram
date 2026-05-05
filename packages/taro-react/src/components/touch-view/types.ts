import type { TouchViewProps as NativeTouchViewProps, TouchViewExpose as NativeTouchViewExpose } from '@doraemon-ui/miniprogram.touch-view'
import type { BasicComponent } from '../../types'

export interface TouchViewProps extends NativeTouchViewProps, BasicComponent {
  onClick?: (event: any) => void
}

export interface TouchViewExpose extends NativeTouchViewExpose {}
