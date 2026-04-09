import { createHostComponent } from '@/hooks/hostComponent'
import type { SkeletonAvatarProps, SkeletonAvatarExpose } from './types'

export const SkeletonAvatar = createHostComponent<SkeletonAvatarProps, SkeletonAvatarExpose>('dora-skeleton-avatar')

SkeletonAvatar.displayName = 'DoraSkeletonAvatar'
