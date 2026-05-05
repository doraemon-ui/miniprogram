import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { WaterMarkProps, WaterMarkExpose } from './types'

export const WaterMark = createHostComponent<WaterMarkProps, WaterMarkExpose>('dora-water-mark')

WaterMark.displayName = 'DoraWaterMark'

// Props registry for Taro WXML template generator
React.createElement('dora-water-mark', {
  prefixCls: '',
  content: [],
  fontColor: '',
  fontStyle: '',
  fontFamily: '',
  fontWeight: '',
  fontSize: 0,
  fullPage: false,
  gapX: 0,
  gapY: 0,
  width: 0,
  height: 0,
  image: '',
  imageHeight: 0,
  imageWidth: 0,
  rotate: 0,
  zIndex: 0,
  onLoad: undefined,
  onError: undefined,
})
