import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { MediaProps, MediaExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
export const Media = createHostComponent<MediaProps, MediaExpose>('dora-media',
{
  prefixCls: 'dora-media',
  thumb: '',
  thumbStyle: null,
  title: '',
  label: '',
  align: 'center',
})

Media.displayName = 'DoraMedia'

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-media', {
  prefixCls: '',
  thumb: '',
  thumbStyle: '',
  title: '',
  label: '',
  align: '',
})
