import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { ResultProps, ResultExpose } from './types'

export const Result = createHostComponent<ResultProps, ResultExpose>('dora-result')

Result.displayName = 'DoraResult'

// Props registry for Taro WXML template generator
React.createElement('dora-result', {
  prefixCls: '',
  icon: '',
  title: '',
  label: '',
  buttons: [],
  extra: '',
  fixed: false,
  onClick: undefined,
})
