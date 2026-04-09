import { createHostComponent } from '@/hooks/hostComponent'
import type { StepProps, StepExpose } from './types'

export const Step = createHostComponent<StepProps, StepExpose>('dora-step')

Step.displayName = 'DoraStep'
