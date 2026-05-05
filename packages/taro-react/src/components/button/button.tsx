import { createHostComponent } from '../../hooks/hostComponent'
import type { ButtonProps, ButtonExpose } from './types'

export const Button = createHostComponent<ButtonProps, ButtonExpose>('dora-button',
{
  prefixCls: 'dora-button',
  color: 'positive',
  fill: 'solid',
  expand: '',
  shape: '',
  size: 'default',
  strong: false,
  disabled: false,
  loading: false,
  formType: '',
  openType: '',
  hoverClass: 'default',
  hoverStopPropagation: false,
  hoverStartTime: 20,
  hoverStayTime: 70,
  lang: 'en',
  sessionFrom: '',
  sendMessageTitle: '',
  sendMessagePath: '',
  sendMessageImg: '',
  showMessageCard: false,
  phoneNumberNoQuotaToast: true,
  appParameter: '',
})

Button.displayName = 'DoraButton'
