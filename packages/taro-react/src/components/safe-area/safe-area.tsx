import { createHostComponent } from '../../hooks/hostComponent'
import type { SafeAreaProps, SafeAreaExpose } from './types'

export const SafeArea = createHostComponent<SafeAreaProps, SafeAreaExpose>('dora-safe-area',
{
  prefixCls: 'dora-safe-area',
  safeArea: { top: false, bottom: false },
  safeAreaStyle: 'default',
  forceRender: false,
  supports: false,
  wrapStyle: null,
})

SafeArea.displayName = 'DoraSafeArea'
