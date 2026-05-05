import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { TagProps, TagExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
export const Tag = createHostComponent<TagProps, TagExpose>('dora-tag',
{
  prefixCls: 'dora-tag',
  hoverClass: 'default',
  color: '',
  closable: false,
  defaultVisible: true,
  visible: true,
  controlled: false,
})

Tag.displayName = 'DoraTag'

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-tag', {
  prefixCls: '',
  hoverClass: '',
  color: '',
  closable: '',
  defaultVisible: '',
  visible: '',
  controlled: '',
  onChange: '',
  onClick: '',
  onClose: '',
})
