import { createHostComponent } from '@/hooks/hostComponent'
import type { SkeletonProps, SkeletonExpose } from './types'

export const Skeleton = createHostComponent<SkeletonProps, SkeletonExpose>('dora-skeleton')

Skeleton.displayName = 'DoraSkeleton'
