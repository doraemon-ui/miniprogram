import type { CardProps as NativeCardProps, CardExpose as NativeCardExpose } from '@doraemon-ui/miniprogram.card'
import type { BasicComponent } from '@/types'

export interface CardProps extends NativeCardProps, BasicComponent {}

export interface CardExpose extends NativeCardExpose {}
