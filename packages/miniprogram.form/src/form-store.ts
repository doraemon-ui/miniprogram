import warning from './warning'
import { set } from './utils'
import { FieldInstance, InputInstanceLike } from './types'
import { FIELD_DATA_PROP, FIELD_META_PROP } from './constants'

export type FormInputProps = {
  [FIELD_DATA_PROP]: FormFieldState
  [FIELD_META_PROP]: Omit<FormFieldMeta, 'fieldElem' | 'inputElem'>
  [x: string]: unknown
}

export type FormError = {
  message: string
  field: string
  fieldValue: unknown
}

export type FormFieldState = {
  name: string
  value?: unknown
  touched?: boolean
  dirty?: boolean
  validating?: boolean
  errors?: FormError[]
}

export type FormRule = {
  /**
   * 仅在 type 为 array 类型时有效，用于指定数组元素的校验规则
   */
  defaultField?: FormRule
  /**
   * 是否匹配枚举中的值，使用时需要将 type 设置为 enum
   */
  enum?: unknown[]
  /**
   * string 类型时为字符串长度；number 类型时为确定数字；array 类型时为数组长度
   */
  len?: number
  /**
   * 必须设置 type：string 类型为字符串最大长度；number 类型时为最大值；array 类型时为数组最大长度
   */
  max?: number
  /**
   * 错误信息，不设置时会通过 validateMessages 自动生成
   */
  message?: string
  /**
   * 必须设置 type：string 类型为字符串最小长度；number 类型时为最小值；array 类型时为数组最小长度
   */
  min?: number
  /**
   * 正则表达式匹配
   */
  pattern?: string | RegExp
  /**
   * 是否为必选字段
   */
  required?: boolean
  /**
   * 将字段值转换成目标值后进行校验
   */
  transform?: string | ((value: unknown) => unknown)
  /**
   * 类型，常见有 string、number、boolean、url、email、enum、array
   */
  type?: string
  /**
   * 设置触发验证时机，必须是 Field 的 validateTrigger 的子集
   */
  validateTrigger?: string | string[]
  /**
   * 自定义校验，接收 Promise 作为返回值
   */
  validator?: string | ((rule: FormRule, value: unknown) => void | boolean | Error | Promise<void>)
  /**
   * 如果字段仅包含空格则校验不通过，只在 type: 'string' 时生效
   */
  whitespace?: boolean
}

export type FormValidateConfig = {
  trigger?: string | string[]
  rules?: FormRule[]
}

export type FormFieldMeta = {
  name?: string
  initialValue?: unknown
  trigger?: string
  valuePropName?: string
  validate?: FormValidateConfig[]
  validateTrigger?: string | string[]
  preserve?: boolean
  rules?: FormRule[]
  validateFirst?: boolean
  hidden?: boolean

  fieldElem?: FieldInstance
  inputElem?: InputInstanceLike
}

type FormFieldRecord = Record<string, FormFieldState>
type FormMetaRecord = Record<string, FormFieldMeta>
type NestedFieldGetter = (fullName: string) => unknown

export function isNullValue(value: unknown) {
  return value === null || value === undefined
}

/**
 * fix: setting data field "xxx" to undefined is invalid.
 *
 * @param {*} value
 * @returns
 */
export function fixNullValue(value: unknown) {
  return isNullValue(value) ? null : value
}

export function flattenArray<T>(arr: T[][]): T[] {
  return Array.prototype.concat.apply([], arr)
}

export function treeTraverse(
  path: string | undefined = '',
  tree: unknown,
  isLeafNode: (path: string, value: unknown) => boolean,
  errorMessage: string,
  callback: (path: string, node: unknown) => void,
) {
  const currentPath = path || ''
  if (isLeafNode(currentPath, tree)) {
    callback(currentPath, tree)
  } else if (tree === undefined || tree === null) {
    // Do nothing
  } else if (Array.isArray(tree)) {
    tree.forEach((subTree, index) => treeTraverse(`${currentPath}[${index}]`, subTree, isLeafNode, errorMessage, callback))
  } else {
    // It's object and not a leaf node
    if (typeof tree !== 'object') {
      warning(false, errorMessage)
      return
    }
    Object.keys(tree).forEach((subTreeKey) => {
      const subTree = (tree as Record<string, unknown>)[subTreeKey]
      treeTraverse(`${currentPath}${currentPath ? '.' : ''}${subTreeKey}`, subTree, isLeafNode, errorMessage, callback)
    })
  }
}

export function flattenFields(
  maybeNestedFields: Record<string, unknown>,
  isLeafNode: (path: string, value: unknown) => boolean,
  errorMessage: string,
) {
  const fields: Record<string, unknown> = {}
  treeTraverse(undefined, maybeNestedFields, isLeafNode, errorMessage, (path, node) => {
    fields[path] = node
  })
  return fields
}

export function normalizeValidateRules(
  validate: FormValidateConfig[] | null | undefined,
  rules: FormRule[] | undefined,
  validateTrigger: string | string[] | undefined,
) {
  const validateRules = (validate || []).map((item) => {
    const newItem = {
      ...item,
      trigger: item.trigger || [],
    }
    if (typeof newItem.trigger === 'string') {
      newItem.trigger = [newItem.trigger]
    }
    return newItem as { trigger: string[]; rules?: FormRule[] }
  })
  if (rules) {
    validateRules.push({
      trigger: validateTrigger ? ([] as string[]).concat(validateTrigger as string | string[]) : [],
      rules,
    })
  }
  return validateRules.map((item) => ({
    ...item,
    rules: item.rules || [],
  }))
}

export function getValidateTriggers(validateRules: FormValidateConfig[]) {
  return validateRules
    .filter((item) => !!item.rules && item.rules.length)
    .map((item) => item.trigger)
    .reduce<string[]>((pre, curr) => pre.concat(curr), [])
}

export function getParams(
  ns?: string[] | string | ((errors: Record<string, unknown> | null, values: Record<string, unknown>) => void) | Record<string, unknown>,
  opt?: Record<string, unknown> | ((errors: Record<string, unknown> | null, values: Record<string, unknown>) => void),
  cb?: (errors: Record<string, unknown> | null, values: Record<string, unknown>) => void,
) {
  let names = ns
  let options = opt
  let callback = cb
  if (cb === undefined) {
    if (typeof names === 'function') {
      callback = names
      options = {}
      names = undefined
    } else if (Array.isArray(names)) {
      if (typeof options === 'function') {
        callback = options
        options = {}
      } else {
        options = options || {}
      }
    } else {
      callback = options as typeof callback
      options = (names as typeof opt) || {}
      names = undefined
    }
  }
  return {
    names: names as string[] | string | undefined,
    options: (options || {}) as Record<string, unknown>,
    callback,
  }
}

export function isEmptyObject(obj: Record<string, unknown>) {
  return Object.keys(obj).length === 0
}

export function hasRules(validate: FormValidateConfig[] | undefined) {
  if (validate) {
    return validate.some((item) => {
      return item.rules && item.rules.length
    })
  }
  return false
}

export function getErrorStrs(errors: FormError[] | undefined) {
  if (errors) {
    return errors.map((e) => {
      if (e && e.message) {
        return e.message
      }
      return e
    })
  }
  return errors
}

export function startsWith(str: string, prefix: string) {
  return str.lastIndexOf(prefix, 0) === 0
}

export function getValueFromEvent(
  e: { detail?: { value?: unknown; checked?: boolean; type?: string }; value?: unknown; checked?: boolean; type?: string } | undefined,
) {
  const getValue = (target: { checked?: boolean; value?: unknown; type?: string }) =>
    target.type === 'checkbox' ? target.checked : target.value
  // To support custom element
  if (!e || !e.detail) {
    if (!!e) {
      return getValue(e)
    }
    return e
  }
  return getValue(e.detail)
}

/**
 * ## 转换校验规则，使之支持 async-validator
 * 注意：由于小程序 data 不支持传入 RegExp & function，所以在设置 rules 需要传入字符串映射！！！
 *
 * @example
 * ```
 * // 手机号验证
 * rules="{{ [{ required: true, pattern: '1[3456789]\d{9}' }] }}"
 * ```
 * @example
 * ```
 * // 自定义验证
 * rules="{{ [{ required: true, validator: 'checkMobile' }] }}"
 *
 * Page({
 *   checkMobile(rule, value) {
 *     if (value) {
 *       return Promise.resolve()
 *     }
 *     return Promise.reject(new Error('手机号不能为空!'))
 *   }
 * })
 * ```
 * @example
 * ```
 * // 校验前去除空格
 * rules="{{ [{ required: true, transform: 'trim' }] }}"
 *
 * Page({
 *   trim(value) {
 *     return value.trim()
 *   }
 * })
 * ```
 * @export
 * @param {array} rules 校验规则，设置字段的校验逻辑
 * @param {object} vm 当前页面的实例对象
 * @return {array}
 */
export function transformRules(rules: FormRule[], vm?: Record<string, unknown>) {
  const currentVm =
    vm ||
    (typeof getCurrentPages === 'function'
      ? ((getCurrentPages()[getCurrentPages().length - 1] || null) as Record<string, unknown> | null)
      : null)
  return rules.map((rule) => {
    const cloneRule = { ...rule }
    // 正则表达式校验
    if (typeof rule.pattern === 'string') {
      cloneRule.pattern = new RegExp(rule.pattern)
    }
    // 校验前转换字段值
    if (typeof rule.transform === 'string' && currentVm && currentVm[rule.transform]) {
      cloneRule.transform = currentVm[rule.transform] as (value: unknown) => unknown
    }
    // 自定义校验，接收 Promise 作为返回值。
    if (typeof rule.validator === 'string' && currentVm && currentVm[rule.validator]) {
      cloneRule.validator = currentVm[rule.validator] as FormRule['validator']
    }
    return cloneRule
  })
}

/**
 * ## Replace with template.
 *
 * @example
 * ```
 * `I'm ${name}` + { name: 'bamboo' } = I'm bamboo
 * ```
 * @export
 * @param {*} template
 * @param {*} kv
 * @return {*}
 */
export function replaceMessage(template: string, kv: Record<string, string>) {
  return template.replace(/\$\{\w+\}/g, (str) => {
    const key = str.slice(2, -1)
    return kv[key]
  })
}

class Field {
  constructor(fields: FormFieldState) {
    Object.assign(this, fields)
  }
}

export function isFormField(obj: unknown) {
  return obj instanceof Field
}

export function createFormField(field: FormFieldState) {
  if (isFormField(field)) {
    return field
  }
  return new Field(field)
}

export function internalFlattenFields(fields: Record<string, unknown>) {
  return flattenFields(fields, (_, node) => isFormField(node), 'You must wrap field data with `createFormField`.')
}

class FieldsStore {
  fields: FormFieldRecord
  fieldsMeta: FormMetaRecord

  constructor(fields: Record<string, unknown> = {}) {
    this.fields = internalFlattenFields(fields) as FormFieldRecord
    this.fieldsMeta = {}
  }

  updateFields(fields: Record<string, unknown>) {
    this.fields = internalFlattenFields(fields) as FormFieldRecord
  }

  flattenRegisteredFields(fields: Record<string, unknown>) {
    const validFieldsName = this.getAllFieldsName()
    return flattenFields(
      fields,
      (path) => validFieldsName.indexOf(path) >= 0,
      'You cannot set a form field before rendering a field associated with the value.',
    )
  }

  setFieldsInitialValue = (initialValues: Record<string, unknown>) => {
    const flattenedInitialValues = this.flattenRegisteredFields(initialValues)
    const fieldsMeta = this.fieldsMeta
    Object.keys(flattenedInitialValues).forEach((name) => {
      if (fieldsMeta[name]) {
        const fieldMeta = this.getFieldMeta(name)
        const initValue = fieldMeta.initialValue
        if (isNullValue(initValue)) {
          this.setFieldMeta(name, {
            ...fieldMeta,
            initialValue: fixNullValue(flattenedInitialValues[name]),
          })
        }
      }
    })
  }

  setFields(fields: FormFieldRecord) {
    const nowFields = {
      ...this.fields,
      ...fields,
    }
    this.fields = nowFields
  }

  resetFields(ns?: string[]) {
    const { fieldsMeta } = this
    const names = ns ? this.getValidFieldsFullName(ns) : this.getAllFieldsName()
    return names.reduce<FormFieldRecord>((acc, name) => {
      const fieldMeta = fieldsMeta[name]
      if (fieldMeta) {
        acc[name] = { name, value: fixNullValue(fieldMeta.initialValue) }
      }
      return acc
    }, {})
  }

  setFieldMeta(name: string, meta: FormFieldMeta) {
    this.fieldsMeta[name] = meta
  }

  setFieldsAsDirty() {
    Object.keys(this.fields).forEach((name) => {
      const field = this.fields[name]
      const fieldMeta = this.fieldsMeta[name]
      if (field && fieldMeta && hasRules(fieldMeta.validate)) {
        this.fields[name] = {
          ...field,
          dirty: true,
        }
      }
    })
  }

  getFieldMeta(name: string) {
    this.fieldsMeta[name] = this.fieldsMeta[name] || {}
    return this.fieldsMeta[name]
  }

  getValueFromFields(name: string, fields: FormFieldRecord) {
    const field = fields[name]
    if (field && 'value' in field) {
      return fixNullValue(field.value)
    }
    const fieldMeta = this.getFieldMeta(name)
    return fieldMeta && fixNullValue(fieldMeta.initialValue)
  }

  getAllValues = () => {
    const { fieldsMeta, fields } = this
    return Object.keys(fieldsMeta).reduce<Record<string, unknown>>((acc, name) => set(acc, name, this.getValueFromFields(name, fields)), {})
  }

  getValidFieldsName() {
    const { fieldsMeta } = this
    return fieldsMeta ? Object.keys(fieldsMeta).filter((name) => !this.getFieldMeta(name).hidden) : []
  }

  getAllFieldsName() {
    const { fieldsMeta } = this
    return fieldsMeta ? Object.keys(fieldsMeta) : []
  }

  getValidFieldsFullName(maybePartialName: string[] | string) {
    const maybePartialNames = Array.isArray(maybePartialName) ? maybePartialName : [maybePartialName]
    return this.getValidFieldsName().filter((fullName) =>
      maybePartialNames.some(
        (partialName) =>
          fullName === partialName || (startsWith(fullName, partialName) && ['.', '['].indexOf(fullName[partialName.length]) >= 0),
      ),
    )
  }

  getFieldValuePropValue(fieldMeta: Pick<FormFieldMeta, 'name' | 'valuePropName' | 'initialValue'>) {
    const { name, valuePropName } = fieldMeta
    const field = this.getField(name as string)
    const fieldValue = 'value' in field ? field.value : fieldMeta.initialValue

    return {
      [valuePropName as string]: fixNullValue(fieldValue),
    }
  }

  getField(name: string) {
    return {
      ...this.fields[name],
      name,
    }
  }

  getNotCollectedFields() {
    const fieldsName = this.getValidFieldsName()
    return fieldsName
      .filter((name) => !this.fields[name])
      .map((name) => ({
        name,
        dirty: false,
        value: this.getFieldMeta(name).initialValue,
      }))
      .reduce<Record<string, unknown>>((acc, field) => set(acc, field.name, createFormField(field)), {})
  }

  getNestedAllFields() {
    return Object.keys(this.fields).reduce<Record<string, unknown>>(
      (acc, name) => set(acc, name, createFormField(this.fields[name])),
      this.getNotCollectedFields(),
    )
  }

  getFieldMember(name: string, member: keyof FormFieldState) {
    return this.getField(name)[member]
  }

  getNestedFields(names: string[] | undefined, getter: NestedFieldGetter) {
    const fields = names || this.getValidFieldsName()
    return fields.reduce<Record<string, unknown>>((acc, f) => set(acc, f, getter(f)), {})
  }

  getNestedField(name: string, getter: NestedFieldGetter) {
    const fullNames = this.getValidFieldsFullName(name)
    if (
      fullNames.length === 0 || // Not registered
      (fullNames.length === 1 && fullNames[0] === name) // Name already is full name.
    ) {
      return getter(name)
    }
    const isArrayValue = fullNames[0][name.length] === '['
    const suffixNameStartIndex = isArrayValue ? name.length : name.length + 1
    return fullNames.reduce((acc, fullName) => set(acc, fullName.slice(suffixNameStartIndex), getter(fullName)), isArrayValue ? [] : {})
  }

  getFieldsValue = (names?: string[]) => {
    return this.getNestedFields(names, this.getFieldValue)
  }

  getFieldValue = (name: string) => {
    const { fields } = this
    return this.getNestedField(name, (fullName) => this.getValueFromFields(fullName, fields))
  }

  getFieldsError = (names?: string[]) => {
    return this.getNestedFields(names, this.getFieldError)
  }

  getFieldError = (name: string) => {
    return this.getNestedField(name, (fullName) => getErrorStrs(this.getFieldMember(fullName, 'errors') as FormError[]))
  }

  isFieldValidating = (name: string) => {
    return this.getFieldMember(name, 'validating')
  }

  isFieldsValidating = (ns?: string[]) => {
    const names = ns || this.getValidFieldsName()
    return names.some((n) => this.isFieldValidating(n))
  }

  isFieldTouched = (name: string) => {
    return this.getFieldMember(name, 'touched')
  }

  isFieldsTouched = (ns?: string[]) => {
    const names = ns || this.getValidFieldsName()
    return names.some((n) => this.isFieldTouched(n))
  }

  clearField(name: string) {
    delete this.fields[name]
    delete this.fieldsMeta[name]
  }
}

export default function createFieldsStore(fields?: Record<string, unknown>) {
  return new FieldsStore(fields)
}
