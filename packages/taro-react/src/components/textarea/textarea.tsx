import { createHostComponent } from '@/hooks/hostComponent'
import type { TextareaProps, TextareaExpose } from './types'

export const Textarea = createHostComponent<TextareaProps, TextareaExpose>('dora-textarea')

Textarea.displayName = 'DoraTextarea'
