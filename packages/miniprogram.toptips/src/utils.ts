import type { ToptipsShowProps } from './types'

export const defaults: Required<ToptipsShowProps> = {
  prefixCls: 'dora-toptips',
  classNames: 'dora-animate--slideInDown',
  icon: 'cancel',
  hidden: false,
  text: '',
  duration: 3000,
  success: () => {},
}
