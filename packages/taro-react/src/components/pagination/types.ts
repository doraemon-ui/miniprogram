import type { PaginationExpose as NativePaginationExpose, PaginationProps as NativePaginationProps } from '@doraemon-ui/miniprogram.pagination'

import type { BasicComponent } from '../../types'

export interface PaginationProps extends NativePaginationProps, BasicComponent {}

export interface PaginationExpose extends NativePaginationExpose {}
