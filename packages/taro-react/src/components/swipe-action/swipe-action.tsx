import { createHostComponent } from '@/hooks/hostComponent'
import type { SwipeActionProps, SwipeActionExpose } from './types'

export const SwipeAction = createHostComponent<SwipeActionProps, SwipeActionExpose>('dora-swipe-action')

SwipeAction.displayName = 'DoraSwipeAction'
