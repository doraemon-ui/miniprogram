import { createHostComponent } from '../../hooks/hostComponent'
import type { ESignProps, ESignExpose } from './types'

export const ESign = createHostComponent<ESignProps, ESignExpose>('dora-e-sign',
{
  prefixCls: 'dora-e-sign',
  type: 'png',
  width: 'auto',
  height: 200,
  bgColor: '#ffffff',
  lineWidth: 3,
  lineColor: '#000000',
  hasFooter: true,
  cancelText: '重置',
  confirmText: '确定',
})

ESign.displayName = 'DoraESign'
