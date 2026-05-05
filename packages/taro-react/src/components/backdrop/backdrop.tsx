import { createHostComponent } from '../../hooks/hostComponent'
import type { BackdropProps, BackdropExpose } from './types'

export const Backdrop = createHostComponent<BackdropProps, BackdropExpose>('dora-backdrop',
{
  prefixCls: 'dora-backdrop',
  transparent: false,
  zIndex: null,
  mountOnEnter: true,
  unmountOnExit: true,
  disableScroll: true,
  visible: false,
  classNames: 'dora-animate--fadeIn',
  wrapStyle: null,
})

Backdrop.displayName = 'DoraBackdrop'
