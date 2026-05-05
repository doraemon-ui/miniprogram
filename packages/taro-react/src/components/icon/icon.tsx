import { createHostComponent } from '../../hooks/hostComponent'
import type { IconProps, IconExpose } from './types'

export const Icon = createHostComponent<IconProps, IconExpose>('dora-icon',
{
  prefixCls: 'doraicons',
  hidden: false,
  type: '',
  size: 32,
  color: '',
})

Icon.displayName = 'DoraIcon'
