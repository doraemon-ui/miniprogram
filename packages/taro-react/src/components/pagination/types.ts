import type {
  PaginationProps as NativePaginationProps,
  PaginationExpose as NativePaginationExpose,
} from '@doraemon-ui/miniprogram.pagination'
import type { BasicComponent } from '@/types'

export interface PaginationProps extends NativePaginationProps, BasicComponent {}

export interface PaginationExpose extends NativePaginationExpose {}
