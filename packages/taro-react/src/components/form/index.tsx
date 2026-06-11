import type { ForwardRefExoticComponent, RefAttributes } from 'react'
import { Form } from './form'
import type { FormProps, FormExpose } from './types'
import Field from '../field'

export type { FormProps, FormExpose }

type CompoundedComponent = ForwardRefExoticComponent<FormProps & RefAttributes<FormExpose>> & {
  Field: typeof Field
}

const InnerForm = Form as CompoundedComponent

InnerForm.Field = Field

export default InnerForm
