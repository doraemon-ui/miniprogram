import type { VcodeExpose as NativeVcodeExpose, VcodeProps as NativeVcodeProps } from '@doraemon-ui/miniprogram.vcode'

import type { BasicComponent } from '../../types'

export interface VcodeProps extends NativeVcodeProps, BasicComponent {
  onChange?: (event: any) => void
  onError?: (event: any) => void
}

export interface VcodeExpose extends NativeVcodeExpose {}
