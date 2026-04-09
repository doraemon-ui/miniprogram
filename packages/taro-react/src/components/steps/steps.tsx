import { createHostComponent } from '@/hooks/hostComponent'
import type { StepsProps, StepsExpose } from './types'

export const Steps = createHostComponent<StepsProps, StepsExpose>('dora-steps')

Steps.displayName = 'DoraSteps'
