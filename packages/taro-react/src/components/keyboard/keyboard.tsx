import { createHostComponent } from '../../hooks/hostComponent'
import type { KeyboardProps, KeyboardExpose } from './types'

export const Keyboard = createHostComponent<KeyboardProps, KeyboardExpose>('dora-keyboard',
{
  prefixCls: 'dora-keyboard',
})

Keyboard.displayName = 'DoraKeyboard'
