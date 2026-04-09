import { createHostComponent } from '@/hooks/hostComponent'
import type { CardProps, CardExpose } from './types'

export const Card = createHostComponent<CardProps, CardExpose>('dora-card')

Card.displayName = 'DoraCard'
