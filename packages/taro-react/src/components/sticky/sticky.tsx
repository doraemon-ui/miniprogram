import { createHostComponent } from '@/hooks/hostComponent'
import type { StickyProps, StickyExpose } from './types'

export const Sticky = createHostComponent<StickyProps, StickyExpose>('dora-sticky')

Sticky.displayName = 'DoraSticky'
