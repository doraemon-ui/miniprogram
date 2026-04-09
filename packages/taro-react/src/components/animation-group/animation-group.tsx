import { createHostComponent } from '@/hooks/hostComponent'
import type { AnimationGroupProps, AnimationGroupExpose } from './types'

export const AnimationGroup = createHostComponent<AnimationGroupProps, AnimationGroupExpose>('dora-animation-group')

AnimationGroup.displayName = 'DoraAnimationGroup'
