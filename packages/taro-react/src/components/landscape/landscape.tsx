import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { LandscapeProps, LandscapeExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
export const Landscape = createHostComponent<LandscapeProps, LandscapeExpose>('dora-landscape',
{
  prefixCls: 'dora-landscape',
  visible: false,
  mask: true,
  maskClosable: false,
  closable: true,
})

Landscape.displayName = 'DoraLandscape'

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-landscape', {
  prefixCls: '',
  visible: '',
  mask: '',
  maskClosable: '',
  closable: '',
  onClose: '',
})
