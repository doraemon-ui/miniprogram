import type { WhiteSpaceExpose as NativeWhiteSpaceExpose, WhiteSpaceProps as NativeWhiteSpaceProps } from '@doraemon-ui/miniprogram.white-space'

import type { BasicComponent } from '../../types'

export interface WhiteSpaceProps extends NativeWhiteSpaceProps, BasicComponent {
  onClick?: (event: any) => void
}

export interface WhiteSpaceExpose extends NativeWhiteSpaceExpose {}
