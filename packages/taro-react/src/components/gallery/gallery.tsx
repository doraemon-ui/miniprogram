import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { GalleryProps, GalleryExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
export const Gallery = createHostComponent<GalleryProps, GalleryExpose>('dora-gallery',
{
  prefixCls: 'dora-gallery',
  visible: false,
  current: 0,
  urls: [],
  classNames: 'dora-animate--slideInRight',
  indicatorDots: false,
  indicatorColor: 'rgba(0, 0, 0, .3)',
  indicatorActiveColor: '#000000',
  autoplay: false,
  interval: 5000,
  duration: 500,
  circular: false,
  vertical: false,
  showDelete: true,
  allowScale: true,
  icon: '',
})

Gallery.displayName = 'DoraGallery'

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-gallery', {
  prefixCls: '',
  visible: '',
  current: '',
  urls: '',
  classNames: '',
  indicatorDots: '',
  indicatorColor: '',
  indicatorActiveColor: '',
  autoplay: '',
  interval: '',
  duration: '',
  circular: '',
  vertical: '',
  showDelete: '',
  allowScale: '',
  icon: '',
  onCancel: '',
  onClose: '',
  onClosed: '',
  onClick: '',
  onDelete: '',
  onChange: '',
})
