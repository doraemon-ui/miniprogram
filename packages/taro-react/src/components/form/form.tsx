import { createHostComponent } from '@/hooks/hostComponent'
import type { FormProps, FormExpose } from './types'

export const Form = createHostComponent<FormProps, FormExpose>('dora-form')

Form.displayName = 'DoraForm'
