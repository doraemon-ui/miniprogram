import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { PaginationProps, PaginationExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
export const Pagination = createHostComponent<PaginationProps, PaginationExpose>('dora-pagination',
{
  prefixCls: 'dora-pagination',
  mode: 'button',
  defaultCurrent: 1,
  current: 1,
  controlled: false,
  total: 0,
  simple: false,
})

Pagination.displayName = 'DoraPagination'

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-pagination', {
  prefixCls: '',
  mode: '',
  defaultCurrent: '',
  current: '',
  controlled: '',
  total: '',
  simple: '',
})
