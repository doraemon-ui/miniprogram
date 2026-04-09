import type { VcodeProps as NativeVcodeProps, VcodeExpose as NativeVcodeExpose } from '@doraemon-ui/miniprogram.vcode'
import type { BasicComponent } from '@/types'

export interface VcodeProps extends NativeVcodeProps, BasicComponent {}

export interface VcodeExpose extends NativeVcodeExpose {}
