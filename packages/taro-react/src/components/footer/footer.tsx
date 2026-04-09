import { createHostComponent } from '@/hooks/hostComponent'
import type { FooterProps, FooterExpose } from './types'

export const Footer = createHostComponent<FooterProps, FooterExpose>('dora-footer')

Footer.displayName = 'DoraFooter'
