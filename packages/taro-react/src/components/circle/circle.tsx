import { createHostComponent } from '@/hooks/hostComponent'
import type { CircleProps, CircleExpose } from './types'

export const Circle = createHostComponent<CircleProps, CircleExpose>('dora-circle')

Circle.displayName = 'DoraCircle'
