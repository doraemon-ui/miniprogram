import { createHostComponent } from '../../hooks/hostComponent'
import type { StepsProps, StepsExpose } from './types'

export const Steps = createHostComponent<StepsProps, StepsExpose>('dora-steps',
{
  prefixCls: 'dora-steps',
  current: 0,
  direction: 'horizontal',
})

Steps.displayName = 'DoraSteps'
