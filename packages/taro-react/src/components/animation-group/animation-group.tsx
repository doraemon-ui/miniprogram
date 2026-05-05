import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { AnimationGroupProps, AnimationGroupExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
export const AnimationGroup = createHostComponent<AnimationGroupProps, AnimationGroupExpose>('dora-animation-group',
{
  in: false,
  classNames: '',
  duration: null,
  type: 'transition',
  appear: false,
  enter: true,
  exit: true,
  mountOnEnter: true,
  unmountOnExit: true,
  wrapCls: '',
  wrapStyle: null,
  disableScroll: false,
})

AnimationGroup.displayName = 'DoraAnimationGroup'

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-animation-group', {
  in: '',
  classNames: '',
  duration: '',
  type: '',
  appear: '',
  enter: '',
  exit: '',
  mountOnEnter: '',
  unmountOnExit: '',
  wrapCls: '',
  wrapStyle: '',
  disableScroll: '',
  onChange: '',
  onClick: '',
})
