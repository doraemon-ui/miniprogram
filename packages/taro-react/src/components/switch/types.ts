import type { SwitchProps as NativeSwitchProps, SwitchExpose as NativeSwitchExpose } from '@doraemon-ui/miniprogram.switch'
import type { BasicComponent } from '../../types'

export interface SwitchProps extends NativeSwitchProps, BasicComponent {
  onChange?: (event: any) => void
}

export interface SwitchExpose extends NativeSwitchExpose {}
