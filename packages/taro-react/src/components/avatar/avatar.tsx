import { createHostComponent } from '../../hooks/hostComponent'
import type { AvatarProps, AvatarExpose } from './types'

export const Avatar = createHostComponent<AvatarProps, AvatarExpose>('dora-avatar',
{
  prefixCls: 'dora-avatar',
  shape: 'circle',
  size: 'default',
  src: '',
  bodyStyle: null,
  scale: false,
})

Avatar.displayName = 'DoraAvatar'
