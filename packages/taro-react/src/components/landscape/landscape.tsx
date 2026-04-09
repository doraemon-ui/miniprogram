import { createHostComponent } from '@/hooks/hostComponent'
import type { LandscapeProps, LandscapeExpose } from './types'

export const Landscape = createHostComponent<LandscapeProps, LandscapeExpose>('dora-landscape')

Landscape.displayName = 'DoraLandscape'
