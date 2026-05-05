import { createHostComponent } from '../../hooks/hostComponent'
import type { LandscapeProps, LandscapeExpose } from './types'

export const Landscape = createHostComponent<LandscapeProps, LandscapeExpose>('dora-landscape',
{
  prefixCls: 'dora-landscape',
  visible: false,
  mask: true,
  maskClosable: false,
  closable: true,
})

Landscape.displayName = 'DoraLandscape'
