import type { ESignProps as NativeESignProps, ESignExpose as NativeESignExpose } from '@doraemon-ui/miniprogram.e-sign'
import type { BasicComponent } from '../../types'

export interface ESignProps extends NativeESignProps, BasicComponent {
  onStart?: (event: any) => void
  onSigning?: (event: any) => void
  onEnd?: (event: any) => void
  onClear?: (event: any) => void
  onSubmit?: (event: any) => void
}

export interface ESignExpose extends NativeESignExpose {}
