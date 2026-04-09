import { createHostComponent } from '@/hooks/hostComponent'
import type { PaginationProps, PaginationExpose } from './types'

export const Pagination = createHostComponent<PaginationProps, PaginationExpose>('dora-pagination')

Pagination.displayName = 'DoraPagination'
