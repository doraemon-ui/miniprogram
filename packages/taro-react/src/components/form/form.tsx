import { createHostComponent } from '../../hooks/hostComponent'
import type { FormProps, FormExpose } from './types'

export const Form = createHostComponent<FormProps, FormExpose>('dora-form',
{
  prefixCls: 'dora-form',
  disabled: false,
  hoverClass: 'default',
  wrapStyle: null,
})

Form.displayName = 'DoraForm'
