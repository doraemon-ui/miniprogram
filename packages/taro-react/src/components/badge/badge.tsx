import { createHostComponent } from '../../hooks/hostComponent'
import type { BadgeProps, BadgeExpose } from './types'

export const Badge = createHostComponent<BadgeProps, BadgeExpose>('dora-badge',
{
  prefixCls: 'dora-badge',
  count: 0,
  overflowCount: 99,
  dot: false,
  showZero: false,
  status: '',
  text: '',
  position: 'topRight',
  backgroundColor: '#ed3f14',
  hideShadow: false,
  title: '',
})

Badge.displayName = 'DoraBadge'
