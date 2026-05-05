import { createHostComponent } from '../../hooks/hostComponent'
import type { WaterMarkProps, WaterMarkExpose } from './types'

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
