import type { FooterExpose as NativeFooterExpose, FooterProps as NativeFooterProps } from '@doraemon-ui/miniprogram.footer'

import type { BasicComponent } from '../../types'

export interface FooterProps extends NativeFooterProps, BasicComponent {
  onLinkClick?: (event: any) => void
  onChipClick?: (event: any) => void
}

export interface FooterExpose extends NativeFooterExpose {}
