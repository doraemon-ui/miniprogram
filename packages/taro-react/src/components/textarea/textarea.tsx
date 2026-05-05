import { createHostComponent } from '../../hooks/hostComponent'
import type { TextareaProps, TextareaExpose } from './types'

export const Textarea = createHostComponent<TextareaProps, TextareaExpose>('dora-textarea',
{
  prefixCls: 'dora-textarea',
  label: '',
  extra: '',
  defaultValue: '',
  value: '',
  controlled: false,
  disabled: false,
  readOnly: false,
  rows: 1,
  hasCount: false,
  clear: false,
  error: false,
  placeholderStyle: null,
})

Textarea.displayName = 'DoraTextarea'
