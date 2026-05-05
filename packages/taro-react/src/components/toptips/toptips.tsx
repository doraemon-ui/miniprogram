import { createHostComponent } from '../../hooks/hostComponent'
import type { ToptipsProps, ToptipsExpose } from './types'

export const Toptips = createHostComponent<ToptipsProps, ToptipsExpose>('dora-toptips',
{
  prefixCls: 'dora-toptips',
  classNames: 'dora-animate--slideInDown',
  icon: 'cancel',
  hidden: false,
  text: '',
  duration: 3000,
})

Toptips.displayName = 'DoraToptips'
