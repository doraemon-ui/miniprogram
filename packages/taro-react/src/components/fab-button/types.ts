import type { FabButtonProps as NativeFabButtonProps, FabButtonExpose as NativeFabButtonExpose } from '@doraemon-ui/miniprogram.fab-button'
import type { BasicComponent } from '../../types'

export interface FabButtonProps extends NativeFabButtonProps, BasicComponent {
  onChange?: (event: any) => void
  onClick?: (event: any) => void
}

export interface FabButtonExpose extends NativeFabButtonExpose {}
