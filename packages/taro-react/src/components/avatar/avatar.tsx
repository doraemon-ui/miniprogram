import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { AvatarProps, AvatarExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
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

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-avatar', {
  prefixCls: '',
  shape: '',
  size: '',
  src: '',
  bodyStyle: '',
  scale: '',
})
