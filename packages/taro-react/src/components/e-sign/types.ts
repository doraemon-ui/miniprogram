import type { ESignProps as NativeESignProps, ESignExpose as NativeESignExpose } from '@doraemon-ui/miniprogram.e-sign'
import type { BasicComponent } from '@/types'

export interface ESignProps extends NativeESignProps, BasicComponent {}

export interface ESignExpose extends NativeESignExpose {}
