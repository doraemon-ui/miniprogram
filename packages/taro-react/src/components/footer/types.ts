import type { FooterProps as NativeFooterProps, FooterExpose as NativeFooterExpose } from '@doraemon-ui/miniprogram.footer'
import type { BasicComponent } from '../../types'

export interface FooterProps extends NativeFooterProps, BasicComponent {
  onClick?: (event: any) => void
}

export interface FooterExpose extends NativeFooterExpose {}
