import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { SkeletonAvatarProps, SkeletonAvatarExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
export const SkeletonAvatar = createHostComponent<SkeletonAvatarProps, SkeletonAvatarExpose>('dora-skeleton-avatar',
{
  prefixCls: 'dora-skeleton-avatar',
  size: 'default',
  shape: 'circle',
  active: false,
})

SkeletonAvatar.displayName = 'DoraSkeletonAvatar'

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-skeleton-avatar', {
  prefixCls: '',
  size: '',
  shape: '',
  active: '',
})
