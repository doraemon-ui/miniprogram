import type { SkeletonExpose as NativeSkeletonExpose, SkeletonProps as NativeSkeletonProps } from '@doraemon-ui/miniprogram.skeleton'

import type { BasicComponent } from '../../types'

export interface SkeletonProps extends NativeSkeletonProps, BasicComponent {}

export interface SkeletonExpose extends NativeSkeletonExpose {}
