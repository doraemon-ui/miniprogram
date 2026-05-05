import { createHostComponent } from '../../hooks/hostComponent'
import type { CardProps, CardExpose } from './types'

export const Card = createHostComponent<CardProps, CardExpose>('dora-card',
{
  prefixCls: 'dora-card',
  hoverClass: 'none',
  bordered: true,
  full: false,
  title: '',
  thumb: '',
  thumbStyle: null,
  extra: '',
  actions: [],
})

Card.displayName = 'DoraCard'
