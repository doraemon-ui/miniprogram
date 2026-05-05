import { createHostComponent } from '../../hooks/hostComponent'
import type { AlertProps, AlertExpose } from './types'

export const Alert = createHostComponent<AlertProps, AlertExpose>('dora-alert',
{
  prefixCls: 'dora-alert',
  classNames: 'dora-animate--fadeIn',
  theme: 'balanced',
  thumb: '',
  title: '',
  label: '',
  closable: false,
})

Alert.displayName = 'DoraAlert'
