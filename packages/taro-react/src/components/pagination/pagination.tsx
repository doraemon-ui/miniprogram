import { createHostComponent } from '../../hooks/hostComponent'
import type { PaginationProps, PaginationExpose } from './types'

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
