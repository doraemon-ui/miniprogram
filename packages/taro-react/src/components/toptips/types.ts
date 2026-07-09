import type { ToptipsExpose as NativeToptipsExpose, ToptipsProps as NativeToptipsProps } from '@doraemon-ui/miniprogram.toptips'

import type { BasicComponent } from '../../types'

export interface ToptipsProps extends NativeToptipsProps, BasicComponent {}

export interface ToptipsExpose extends NativeToptipsExpose {}
