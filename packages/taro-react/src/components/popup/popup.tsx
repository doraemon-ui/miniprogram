import { createHostComponent } from '../../hooks/hostComponent'
import type { PopupProps, PopupExpose } from './types'

export const Popup = createHostComponent<PopupProps, PopupExpose>('dora-popup',
{
  prefixCls: 'dora-popup',
  animationPrefixCls: 'dora-animate',
  position: 'center',
  wrapStyle: null,
  bodyStyle: null,
  mask: true,
  maskClosable: true,
  maskTransparent: false,
  maskStyle: null,
  visible: false,
  closeOnSwipe: false,
  zIndex: null,
  mountOnEnter: true,
  unmountOnExit: true,
  closable: false,
  safeArea: false,
})

Popup.displayName = 'DoraPopup'
