import { createHostComponent } from '@/hooks/hostComponent'
import type { GalleryProps, GalleryExpose } from './types'

export const Gallery = createHostComponent<GalleryProps, GalleryExpose>('dora-gallery')

Gallery.displayName = 'DoraGallery'
