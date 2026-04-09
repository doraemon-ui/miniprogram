import { createHostComponent } from '@/hooks/hostComponent'
import type { ButtonProps, ButtonExpose } from './types'

export const Button = createHostComponent<ButtonProps, ButtonExpose>('dora-button')

Button.displayName = 'DoraButton'
