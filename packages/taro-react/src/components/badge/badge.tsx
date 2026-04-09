import { createHostComponent } from '@/hooks/hostComponent'
import type { BadgeProps, BadgeExpose } from './types'

export const Badge = createHostComponent<BadgeProps, BadgeExpose>('dora-badge')

Badge.displayName = 'DoraBadge'
