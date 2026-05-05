import { createHostComponent } from '../../hooks/hostComponent'
import type { SwipeActionProps, SwipeActionExpose } from './types'

export const SwipeAction = createHostComponent<SwipeActionProps, SwipeActionExpose>('dora-swipe-action',
{
  prefixCls: 'dora-swipe',
  autoClose: false,
  disabled: false,
  left: [],
  right: [],
  useSlots: false,
  data: null,
})

SwipeAction.displayName = 'DoraSwipeAction'
