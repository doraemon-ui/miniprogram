import type { Doraemon, ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { Field } from './field'
import type { Form } from './index'
import type { FormFieldState, FormInputProps, FormRule, FormValidateConfig } from './form-store'

export type InputInstanceLike = Doraemon & {
  hasFieldDecorator?: boolean
  [x: string]: unknown
}

export type FormMode = 'default' | 'card'
export type FormLayout = 'horizontal' | 'vertical' | 'none'
export type FormRequiredMarkStyle = 'asterisk' | 'text-required' | 'text-optional'

export interface FormValidateMessages {
  [key: string]: string
}

export type FormContext = Pick<
  FormProps,
  'layout' | 'validateMessages' | 'requiredMarkStyle' | 'asteriskText' | 'requiredText' | 'optionalText' | 'disabled' | 'readOnly'
>

export interface FormProps {
  prefixCls?: string
  cellGroupPrefixCls?: string
  title?: string
  label?: string
  mode?: FormMode
  bodyStyle?: Partial<CSSStyleDeclaration> | null
  layout?: FormLayout
  validateMessages?: FormValidateMessages | null
  requiredMarkStyle?: FormRequiredMarkStyle
  asteriskText?: string
  requiredText?: string
  optionalText?: string
  disabled?: boolean
  readOnly?: boolean
}

export interface FormExpose {
  getFieldsValue: (names?: string[]) => Record<string, unknown>
  getFieldValue: (name: string) => unknown
  setFieldsInitialValue: (values: Record<string, unknown>) => void
  getFieldsError: (names?: string[]) => Record<string, unknown>
  getFieldError: (name: string) => unknown
  isFieldValidating: (name: string) => boolean | undefined
  isFieldsValidating: (names?: string[]) => boolean
  isFieldsTouched: (names?: string[]) => boolean
  isFieldTouched: (name: string) => boolean | undefined
  setFieldsValue: (values: Record<string, unknown>, callback?: () => void) => void
  setFields: (fields: Record<string, FormFieldState>, callback?: () => void) => void
  resetFields: (names?: string[] | string) => void
  validateFields: (
    names?: string[] | string,
    options?: Record<string, unknown>,
    callback?: (errors: Record<string, unknown> | null, values: Record<string, unknown>) => void,
  ) => Promise<Record<string, unknown>>
  getFieldInstance: (name: string) => FieldInstance | undefined
  getInternalHooks: (key: string) => FormHooks | null
}

export type FormInstance = ComponentPublicInstance<Form, FormProps, FormExpose>

export interface FieldProps {
  prefixCls?: string
  initialValue?: unknown
  valuePropName?: string
  trigger?: string
  validate?: FormValidateConfig[]
  validateTrigger?: string | string[]
  preserve?: boolean
  rules?: FormRule[]
  validateFirst?: boolean
  hidden?: boolean
  childElementPosition?: string
  cellPrefixCls?: string
  label?: string
  labelWrap?: boolean
  extra?: string
  isLink?: boolean
  align?: string
  disabled?: boolean
  readOnly?: boolean

  validateStatus?: unknown
  required?: unknown
  help?: unknown
  hasFeedback?: boolean

  name?: string
  value?: unknown
}

export type FieldData = Pick<
  FieldProps,
  | 'name'
  | 'initialValue'
  | 'value'
  | 'valuePropName'
  | 'trigger'
  | 'validate'
  | 'validateTrigger'
  | 'preserve'
  | 'rules'
  | 'validateFirst'
  | 'hidden'
>

export interface FieldExpose {
  changeContext: (index: number, isLast: boolean, context: Partial<FormContext>) => void
  getFieldData: () => FieldData
  forceUpdate: (inputElem?: unknown, callback?: () => void) => void
}

export type FieldInstance = ComponentPublicInstance<Field, FieldProps, FieldExpose>

export interface FormHooks {
  registerField: (name: string, fieldElem: FieldInstance) => () => void
  getFieldDecorator: (name: string, fieldData: FieldData, fieldElem: FieldInstance) => (inputElem: InputInstanceLike) => FormInputProps
}
