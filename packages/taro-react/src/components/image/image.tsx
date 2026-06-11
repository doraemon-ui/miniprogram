import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { ImageProps, ImageExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
export const Image = createHostComponent<ImageProps, ImageExpose>('dora-image',
{
  prefixCls: 'dora-image',
  rootClassName: '',
  rootStyle: null,
  classNames: {},
  styles: {},
  src: '',
  mode: 'scaleToFill',
  webp: false,
  lazyLoad: false,
  showMenuByLongpress: false,
  shape: 'normal',
  width: 300,
  height: 225,
  unmountOnEmpty: false,
  unmountOnError: false,
  empty: '',
  loading: '',
  error: '',
})

Image.displayName = 'DoraImage'

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-image', {
  prefixCls: '',
  rootClassName: '',
  rootStyle: '',
  classNames: '',
  styles: '',
  src: '',
  mode: '',
  webp: '',
  lazyLoad: '',
  showMenuByLongpress: '',
  shape: '',
  width: '',
  height: '',
  unmountOnEmpty: '',
  unmountOnError: '',
  empty: '',
  loading: '',
  error: '',
  onChange: '',
  onLoad: '',
  onError: '',
  onClick: '',
})
