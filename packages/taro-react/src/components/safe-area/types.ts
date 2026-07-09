import type { SafeAreaExpose as NativeSafeAreaExpose, SafeAreaProps as NativeSafeAreaProps } from '@doraemon-ui/miniprogram.safe-area'

import type { BasicComponent } from '../../types'

export interface SafeAreaProps extends NativeSafeAreaProps, BasicComponent {}

export interface SafeAreaExpose extends NativeSafeAreaExpose {}
