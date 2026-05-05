import { createHostComponent } from '../../hooks/hostComponent'
import type { DialogProps, DialogExpose } from './types'

export const Dialog = createHostComponent<DialogProps, DialogExpose>('dora-dialog',
{
  prefixCls: 'dora-dialog',
  bodyStyle: null,
  mask: true,
  maskClosable: true,
  visible: false,
  zIndex: null,
  closable: false,
  buttonClosable: false,
  verticalButtons: false,
  image: '',
  title: '',
  content: '',
  buttons: [],
})

Dialog.displayName = 'DoraDialog'
