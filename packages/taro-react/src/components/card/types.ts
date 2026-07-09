import type { CardExpose as NativeCardExpose, CardProps as NativeCardProps } from '@doraemon-ui/miniprogram.card'

import type { BasicComponent } from '../../types'

export interface CardProps extends NativeCardProps, BasicComponent {
  onAction?: (event: any) => void
}

export interface CardExpose extends NativeCardExpose {}
