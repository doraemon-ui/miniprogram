import type { BadgeProps as NativeBadgeProps, BadgeExpose as NativeBadgeExpose } from '@doraemon-ui/miniprogram.badge'
import type { BasicComponent } from '@/types'

export interface BadgeProps extends NativeBadgeProps, BasicComponent {}

export interface BadgeExpose extends NativeBadgeExpose {}
