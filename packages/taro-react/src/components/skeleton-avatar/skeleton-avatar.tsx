import { createHostComponent } from '../../hooks/hostComponent'
import type { SkeletonAvatarProps, SkeletonAvatarExpose } from './types'

export const SkeletonAvatar = createHostComponent<SkeletonAvatarProps, SkeletonAvatarExpose>('dora-skeleton-avatar',
{
  prefixCls: 'dora-skeleton-avatar',
  size: 'default',
  shape: 'circle',
  active: false,
})

SkeletonAvatar.displayName = 'DoraSkeletonAvatar'
