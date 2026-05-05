import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { StepProps, StepExpose } from './types'

export const Step = createHostComponent<StepProps, StepExpose>('dora-step')

Step.displayName = 'DoraStep'

// Props registry for Taro WXML template generator
React.createElement('dora-step', {
  prefixCls: '',
  status: '',
  title: '',
  content: '',
  icon: '',
})
