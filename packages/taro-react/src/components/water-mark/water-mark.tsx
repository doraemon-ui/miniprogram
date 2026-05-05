import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { WaterMarkProps, WaterMarkExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
export const WaterMark = createHostComponent<WaterMarkProps, WaterMarkExpose>('dora-water-mark',
{
  prefixCls: 'dora-water-mark',
  content: null,
  fontColor: 'rgba(0, 0, 0, .15)',
  fontStyle: 'normal',
  fontFamily: 'sans-serif',
  fontWeight: 'normal',
  fontSize: 14,
  fullPage: true,
  gapX: 24,
  gapY: 48,
  width: 120,
  height: 64,
  image: '',
  imageHeight: 64,
  imageWidth: 128,
  rotate: -22,
  zIndex: 2000,
})

WaterMark.displayName = 'DoraWaterMark'

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-water-mark', {
  prefixCls: '',
  content: '',
  fontColor: '',
  fontStyle: '',
  fontFamily: '',
  fontWeight: '',
  fontSize: '',
  fullPage: '',
  gapX: '',
  gapY: '',
  width: '',
  height: '',
  image: '',
  imageHeight: '',
  imageWidth: '',
  rotate: '',
  zIndex: '',
  onLoad: '',
  onError: '',
})
