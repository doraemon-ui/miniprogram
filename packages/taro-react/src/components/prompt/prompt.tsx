import { createHostComponent } from '@/hooks/hostComponent'
import type { PromptProps, PromptExpose } from './types'

export const Prompt = createHostComponent<PromptProps, PromptExpose>('dora-prompt')

Prompt.displayName = 'DoraPrompt'
