import type { StickyItemExpose as NativeStickyItemExpose, StickyItemProps as NativeStickyItemProps } from '@doraemon-ui/miniprogram.sticky'

import type { BasicComponent } from '../../types'

export interface StickyItemProps extends NativeStickyItemProps, BasicComponent {}

export interface StickyItemExpose extends NativeStickyItemExpose {}
