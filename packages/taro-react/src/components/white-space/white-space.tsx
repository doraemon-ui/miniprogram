import { createHostComponent } from '@/hooks/hostComponent'
import type { WhiteSpaceProps, WhiteSpaceExpose } from './types'

export const WhiteSpace = createHostComponent<WhiteSpaceProps, WhiteSpaceExpose>('dora-white-space')

WhiteSpace.displayName = 'DoraWhiteSpace'
