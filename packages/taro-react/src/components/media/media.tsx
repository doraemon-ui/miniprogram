import { createHostComponent } from '@/hooks/hostComponent'
import type { MediaProps, MediaExpose } from './types'

export const Media = createHostComponent<MediaProps, MediaExpose>('dora-media')

Media.displayName = 'DoraMedia'
