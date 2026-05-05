import { createHostComponent } from '../../hooks/hostComponent'
import type { ToastProps, ToastExpose } from './types'

export const Toast = createHostComponent<ToastProps, ToastExpose>('dora-toast',
{
  prefixCls: 'dora-toast',
  image: '',
  icon: '',
  iconColor: '',
  text: '',
  position: 'center',
  mask: true,
  maskClosable: true,
  visible: false,
  zIndex: null,
})

Toast.displayName = 'DoraToast'
