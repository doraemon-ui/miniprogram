import { createHostComponent } from '../../hooks/hostComponent'
import type { QrcodeProps, QrcodeExpose } from './types'

export const Qrcode = createHostComponent<QrcodeProps, QrcodeExpose>('dora-qrcode',
{
  prefixCls: 'dora-qrcode',
  typeNumber: -1,
  errorCorrectLevel: 2,
  width: 200,
  height: 200,
  whiteSpace: 0,
  fgColor: 'black',
  bgColor: 'white',
  data: '',
  showMenuByLongpress: false,
  qrcodeStatus: 'activated',
  qrcodeExpiredText: '二维码过期',
  qrcodeRefreshText: '点击刷新',
})

Qrcode.displayName = 'DoraQrcode'
