import type { ResultExpose as NativeResultExpose, ResultProps as NativeResultProps } from '@doraemon-ui/miniprogram.result'

import type { BasicComponent } from '../../types'

export interface ResultProps extends NativeResultProps, BasicComponent {
  onClick?: (event: any) => void
}

export interface ResultExpose extends NativeResultExpose {}
