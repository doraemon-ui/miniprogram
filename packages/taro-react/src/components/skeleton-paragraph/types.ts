import type {
  SkeletonParagraphProps as NativeSkeletonParagraphProps,
  SkeletonParagraphExpose as NativeSkeletonParagraphExpose,
} from '@doraemon-ui/miniprogram.skeleton'
import type { BasicComponent } from '@/types'

export interface SkeletonParagraphProps extends NativeSkeletonParagraphProps, BasicComponent {}

export interface SkeletonParagraphExpose extends NativeSkeletonParagraphExpose {}
