import type { StickyExpose as NativeStickyExpose, StickyProps as NativeStickyProps } from '@doraemon-ui/miniprogram.sticky'

import type { BasicComponent } from '../../types'

export interface StickyProps extends NativeStickyProps, BasicComponent {}

export interface StickyExpose extends NativeStickyExpose {}
