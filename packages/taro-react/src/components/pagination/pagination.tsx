import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { PaginationProps, PaginationExpose } from './types'

export const Pagination = createHostComponent<PaginationProps, PaginationExpose>('dora-pagination')

Pagination.displayName = 'DoraPagination'

// Props registry for Taro WXML template generator
React.createElement('dora-pagination', {
  prefixCls: '',
  mode: '',
  defaultCurrent: 0,
  current: 0,
  controlled: false,
  total: 0,
  simple: false,
})
