import { createHostComponent } from '../../hooks/hostComponent'
import type { SkeletonProps, SkeletonExpose } from './types'

export const Skeleton = createHostComponent<SkeletonProps, SkeletonExpose>('dora-skeleton',
{
  prefixCls: 'dora-skeleton',
  active: false,
})

Skeleton.displayName = 'DoraSkeleton'
