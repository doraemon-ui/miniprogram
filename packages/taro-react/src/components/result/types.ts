import type { ResultProps as NativeResultProps, ResultExpose as NativeResultExpose } from '@doraemon-ui/miniprogram.result'
import type { BasicComponent } from '@/types'

export interface ResultProps extends NativeResultProps, BasicComponent {}

export interface ResultExpose extends NativeResultExpose {}
