import type { BadgeExpose as NativeBadgeExpose, BadgeProps as NativeBadgeProps } from '@doraemon-ui/miniprogram.badge'

import type { BasicComponent } from '../../types'

export interface BadgeProps extends NativeBadgeProps, BasicComponent {}

export interface BadgeExpose extends NativeBadgeExpose {}
