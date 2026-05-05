import { createHostComponent } from '../../hooks/hostComponent'
import type { WhiteSpaceProps, WhiteSpaceExpose } from './types'

export const WhiteSpace = createHostComponent<WhiteSpaceProps, WhiteSpaceExpose>('dora-white-space',
{
  prefixCls: 'dora-white-space',
  size: 'default',
  bodyStyle: null,
})

WhiteSpace.displayName = 'DoraWhiteSpace'
