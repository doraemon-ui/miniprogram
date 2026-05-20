import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'
import type { MiniprogramDOMRect } from '@doraemon-ui/miniprogram.shared'

import type { Popover } from './index'

export type PopoverPlacement =
  | 'topLeft'
  | 'top'
  | 'topRight'
  | 'rightTop'
  | 'right'
  | 'rightBottom'
  | 'bottomRight'
  | 'bottom'
  | 'bottomLeft'
  | 'leftBottom'
  | 'left'
  | 'leftTop'

export type PopoverColor = 'light' | 'dark'
export type PopoverTrigger = 'click'

export interface PopoverProps {
  prefixCls?: string
  classNames?: string
  color?: PopoverColor
  title?: string
  content?: string
  placement?: PopoverPlacement
  trigger?: PopoverTrigger
  bodyStyle?: string | Partial<CSSStyleDeclaration>
  defaultVisible?: boolean
  visible?: boolean
  controlled?: boolean
  mask?: boolean
  maskClosable?: boolean
  useSlot?: boolean
  slotRect?: MiniprogramDOMRect | null
  relativeRect?: MiniprogramDOMRect | null
}

export interface PopoverExpose {
  onChange?: () => void
}

export type PopoverInstance = ComponentPublicInstance<Popover, PopoverProps, PopoverExpose>
