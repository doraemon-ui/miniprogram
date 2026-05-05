import { createHostComponent } from '../../hooks/hostComponent'
import type { RaterProps, RaterExpose } from './types'

export const Rater = createHostComponent<RaterProps, RaterExpose>('dora-rater',
{
  prefixCls: 'dora-rater',
  max: 5,
  icon: '',
  star: '★',
  defaultValue: 0,
  value: 0,
  activeColor: '#ffc900',
  margin: 2,
  fontSize: 25,
  disabled: false,
  allowHalf: false,
  allowClear: false,
  allowTouchMove: false,
  controlled: false,
})

Rater.displayName = 'DoraRater'
