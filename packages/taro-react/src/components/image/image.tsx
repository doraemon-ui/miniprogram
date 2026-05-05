import { createHostComponent } from '../../hooks/hostComponent'
import type { ImageProps, ImageExpose } from './types'

export const Image = createHostComponent<ImageProps, ImageExpose>('dora-image',
{
  prefixCls: 'dora-image',
  disabled: false,
  hoverClass: 'default',
  wrapStyle: null,
})

Image.displayName = 'DoraImage'
