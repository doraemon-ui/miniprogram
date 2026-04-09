import type {
  SkeletonAvatarProps as NativeSkeletonAvatarProps,
  SkeletonAvatarExpose as NativeSkeletonAvatarExpose,
} from '@doraemon-ui/miniprogram.skeleton'
import type { BasicComponent } from '@/types'

export interface SkeletonAvatarProps extends NativeSkeletonAvatarProps, BasicComponent {}

export interface SkeletonAvatarExpose extends NativeSkeletonAvatarExpose {}
