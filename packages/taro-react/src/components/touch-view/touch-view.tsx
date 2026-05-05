import { createHostComponent } from '../../hooks/hostComponent'
import type { TouchViewProps, TouchViewExpose } from './types'

export const TouchView = createHostComponent<TouchViewProps, TouchViewExpose>('dora-touch-view',
{
  prefixCls: 'dora-touch-view',
  hoverClass: 'none',
  hoverStopPropagation: false,
  hoverStartTime: 20,
  hoverStayTime: 70,
  wrapStyle: null,
})

TouchView.displayName = 'DoraTouchView'
