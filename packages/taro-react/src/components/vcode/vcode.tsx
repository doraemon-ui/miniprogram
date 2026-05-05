import { createHostComponent } from '../../hooks/hostComponent'
import type { VcodeProps, VcodeExpose } from './types'

export const Vcode = createHostComponent<VcodeProps, VcodeExpose>('dora-vcode',
{
  prefixCls: 'dora-vcode',
  str: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  num: 6,
  width: 120,
  height: 40,
  bgColor: '',
  fontColor: '',
  hasPoint: true,
  hasLine: true,
  canvasId: 'dora-vcode',
})

Vcode.displayName = 'DoraVcode'
