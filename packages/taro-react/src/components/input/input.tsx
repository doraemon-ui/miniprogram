import { createHostComponent } from '@/hooks/hostComponent'
import type { InputProps, InputExpose } from './types'

export const Input = createHostComponent<InputProps, InputExpose>('dora-input')

Input.displayName = 'DoraInput'
