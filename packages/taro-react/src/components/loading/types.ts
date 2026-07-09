import type { LoadingExpose as NativeLoadingExpose, LoadingProps as NativeLoadingProps } from '@doraemon-ui/miniprogram.loading'

import type { BasicComponent } from '../../types'

export interface LoadingProps extends NativeLoadingProps, BasicComponent {}

export interface LoadingExpose extends NativeLoadingExpose {}
