import type { ButtonExpose as NativeButtonExpose, ButtonProps as NativeButtonProps } from '@doraemon-ui/miniprogram.button'

import type { BasicComponent } from '../../types'

export interface ButtonProps extends NativeButtonProps, BasicComponent {
  onClick?: (event: any) => void
}

export interface ButtonExpose extends NativeButtonExpose {}
