import { createHostComponent } from '../../hooks/hostComponent'
import type { FieldProps, FieldExpose } from './types'

export const Field = createHostComponent<FieldProps, FieldExpose>('dora-field',
{
  prefixCls: 'dora-field',
  label: '',
  labelWrap: false,
  extra: '',
  help: '',
  childElementPosition: 'none',
  isLink: false,
  align: 'flex-start',
  disabled: false,
  readOnly: false,
  hidden: false,
  required: false,
  feedbackMessage: [],
  hasFeedback: false,
  index: 0,
  isLast: false,
})

Field.displayName = 'DoraField'
