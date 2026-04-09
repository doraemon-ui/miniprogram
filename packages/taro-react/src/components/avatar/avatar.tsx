import { createHostComponent } from '@/hooks/hostComponent'
import type { AvatarProps, AvatarExpose } from './types'

export const Avatar = createHostComponent<AvatarProps, AvatarExpose>('dora-avatar')

Avatar.displayName = 'DoraAvatar'
