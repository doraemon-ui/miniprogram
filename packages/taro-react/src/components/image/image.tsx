import { createHostComponent } from '@/hooks/hostComponent'
import type { ImageProps, ImageExpose } from './types'

export const Image = createHostComponent<ImageProps, ImageExpose>('dora-image')

Image.displayName = 'DoraImage'
