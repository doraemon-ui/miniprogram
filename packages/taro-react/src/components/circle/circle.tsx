import { createHostComponent } from '../../hooks/hostComponent'
import type { CircleProps, CircleExpose } from './types'

export const Circle = createHostComponent<CircleProps, CircleExpose>('dora-circle',
{
  prefixCls: 'dora-circle',
  percent: 0,
  strokeWidth: 10,
  size: 120,
  lineCap: 'round',
  backgroundColor: '#f3f3f3',
  color: '#33cd5f',
  sAngle: 0,
  counterclockwise: false,
  speed: 2000,
  animate: true,
  background: true,
})

Circle.displayName = 'DoraCircle'
