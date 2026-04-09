import { createHostComponent } from '@/hooks/hostComponent'
import type { RaterProps, RaterExpose } from './types'

export const Rater = createHostComponent<RaterProps, RaterExpose>('dora-rater')

Rater.displayName = 'DoraRater'
