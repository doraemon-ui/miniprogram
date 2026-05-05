import { createHostComponent } from '../../hooks/hostComponent'
import type { FooterProps, FooterExpose } from './types'

export const Footer = createHostComponent<FooterProps, FooterExpose>('dora-footer',
{
  prefixCls: 'dora-footer',
  disabled: false,
  hoverClass: 'default',
  wrapStyle: null,
})

Footer.displayName = 'DoraFooter'
