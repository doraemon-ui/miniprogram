import type { SwitchExpose as NativeSwitchExpose, SwitchProps as NativeSwitchProps } from '@doraemon-ui/miniprogram.switch'

import type { BasicComponent } from '../../types'

export interface SwitchProps extends NativeSwitchProps, BasicComponent {
  onChange?: (event: any) => void
}

export interface SwitchExpose extends NativeSwitchExpose {}
