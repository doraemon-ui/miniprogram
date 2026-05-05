import { createHostComponent } from '../../hooks/hostComponent'
import type { AnimationGroupProps, AnimationGroupExpose } from './types'

export const AnimationGroup = createHostComponent<AnimationGroupProps, AnimationGroupExpose>('dora-animation-group',
{
  in: false,
  classNames: '',
  duration: null,
  type: 'transition',
  appear: false,
  enter: true,
  exit: true,
  mountOnEnter: true,
  unmountOnExit: true,
  wrapCls: '',
  wrapStyle: null,
  disableScroll: false,
})

AnimationGroup.displayName = 'DoraAnimationGroup'
