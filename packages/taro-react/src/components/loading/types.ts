import type { LoadingProps as NativeLoadingProps, LoadingExpose as NativeLoadingExpose } from '@doraemon-ui/miniprogram.loading'
import type { BasicComponent } from '@/types'

export interface LoadingProps extends NativeLoadingProps, BasicComponent {}

export interface LoadingExpose extends NativeLoadingExpose {}
