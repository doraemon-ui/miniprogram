import { defineComponentHOC, Doraemon, Component, Watch } from '@doraemon-ui/miniprogram.core-js'
import createFieldsStore, {
  flattenArray,
  getParams,
  getValidateTriggers,
  getValueFromEvent,
  hasRules,
  isEmptyObject,
  isNullValue,
  normalizeValidateRules,
  transformRules,
} from './form-store'
import type { FormFieldMeta, FormFieldState, FormInputProps, FormRule } from './form-store'
import type {
  FieldData,
  FieldInstance,
  FormHooks,
  FormLayout,
  FormMode,
  FormProps,
  FormRequiredMarkStyle,
  FormValidateMessages,
  InputInstanceLike,
} from './types'
import { eq, get, set } from './utils'
import AsyncValidator from './async-validator'
import warning from './warning'
import { DEFAULT_TRIGGER, FIELD_DATA_PROP, FIELD_META_PROP, toFormEventName } from './constants'
import { formProps } from './props'

const { classNames } = Doraemon.util

type FormBridge = {
  name: string
  dispatch: (event: string, ...args: unknown[]) => void
}

@Component({
  components: {
    Field: () => ({
      module: './field',
      type: 'descendant',
      observer: 'onChildChanged',
    }),
  },
  props: formProps,
  expose: [
    'getFieldsValue',
    'getFieldValue',
    'setFieldsInitialValue',
    'getFieldsError',
    'getFieldError',
    'isFieldValidating',
    'isFieldsValidating',
    'isFieldsTouched',
    'isFieldTouched',
    'setFieldsValue',
    'setFields',
    'resetFields',
    'validateFields',
    'getFieldInstance',
    'getInternalHooks',
  ],
})
class Form extends Doraemon {
  prefixCls!: string
  cellGroupPrefixCls!: string
  title!: string
  label!: string
  mode!: FormMode
  bodyStyle!: Partial<CSSStyleDeclaration> | null
  layout!: FormLayout
  validateMessages!: FormValidateMessages | null
  requiredMarkStyle!: FormRequiredMarkStyle
  asteriskText!: string
  requiredText!: string
  optionalText!: string
  disabled!: boolean
  readOnly!: boolean

  _fieldsStore!: ReturnType<typeof createFieldsStore>
  _renderFields!: Record<string, boolean>
  _cachedBind!: Record<string, Record<string, { fn: (...args: unknown[]) => void; oriFn: Function }>>
  _clearedFieldMetaCache!: Record<string, { field: FormFieldState; meta: FormFieldMeta }>
  _instances!: Record<string, FieldInstance>
  _formBridges!: Record<string, FormBridge>

  get classes() {
    const { prefixCls } = this
    return {
      wrap: classNames(prefixCls),
      footer: `${prefixCls}__footer`,
    }
  }

  @Watch('layout')
  @Watch('validateMessages')
  @Watch('requiredMarkStyle')
  @Watch('asteriskText')
  @Watch('requiredText')
  @Watch('optionalText')
  @Watch('disabled')
  @Watch('readOnly')
  onContextChange() {
    this.changeFieldElem(this)
  }

  onChildChanged() {
    this.changeValue()
  }

  changeFieldElem(props: FormProps) {
    Doraemon.nextTick(() => {
      const { layout, validateMessages, requiredMarkStyle, asteriskText, requiredText, optionalText, disabled, readOnly } = props
      const fields = this.$children as FieldInstance[]
      if (fields.length === 0) return
      const lastIndex = fields.length - 1
      fields.forEach((field, index) => {
        field.changeContext(index, index === lastIndex, {
          layout,
          validateMessages,
          requiredMarkStyle,
          asteriskText,
          requiredText,
          optionalText,
          disabled,
          readOnly,
        })
      })
    })
  }

  changeValue() {
    this.changeFieldElem(this)
    this.clearUnlinkedFields()
  }

  saveRef(name: string, component: FieldInstance | null) {
    if (!component) {
      const fieldMeta = this._fieldsStore.getFieldMeta(name)
      if (!fieldMeta.preserve) {
        this._clearedFieldMetaCache[name] = {
          field: this._fieldsStore.getField(name),
          meta: fieldMeta,
        }
        this.clearField(name)
      }
      return
    }
    this.recoverClearedField(name)
    this._instances[name] = component
  }

  recoverClearedField(name: string) {
    if (this._clearedFieldMetaCache[name]) {
      this._fieldsStore.setFields({
        [name]: this._clearedFieldMetaCache[name].field,
      })
      this._fieldsStore.setFieldMeta(name, this._clearedFieldMetaCache[name].meta)
      delete this._clearedFieldMetaCache[name]
    }
  }

  setFieldsAsErrors(name: string, fieldMeta: FormFieldMeta) {
    const fieldNames = this._fieldsStore.getValidFieldsFullName(name)
    if (fieldNames.includes(name) && !hasRules(fieldMeta.validate)) {
      const nowField = this._fieldsStore.getField(name)
      if (nowField.errors) {
        this._fieldsStore.setFields({
          [name]: {
            ...nowField,
            errors: undefined,
          },
        })
      }
    }
  }

  clearUnlinkedFields() {
    const fieldList = this._fieldsStore.getAllFieldsName()
    const removedList = fieldList.filter((field) => {
      const fieldMeta = this._fieldsStore.getFieldMeta(field)
      return !this._renderFields[field] && !fieldMeta.preserve
    })

    if (removedList.length > 0) {
      removedList.forEach((name) => this.clearField(name))
    }
  }

  clearField(name: string) {
    this._fieldsStore.clearField(name)
    delete this._renderFields[name]
    delete this._instances[name]
    delete this._cachedBind[name]
    delete this._formBridges[name]
  }

  setFields(maybeNestedFields: Record<string, FormFieldState>, callback?: () => void) {
    const fields = this._fieldsStore.flattenRegisteredFields(maybeNestedFields) as Record<string, FormFieldState>
    Object.keys(fields).forEach((name) => {
      this._fieldsStore.setFields({ [name]: fields[name] })
      const fieldMeta = this._fieldsStore.getFieldMeta(name)
      if (fieldMeta) {
        const { fieldElem, inputElem } = fieldMeta
        fieldElem.forceUpdate(inputElem, callback)
      }
    })

    // trigger onFieldsChange
    const changedFields = Object.keys(fields).reduce((acc, name) => set(acc, name, this._fieldsStore.getField(name)), {})
    const allFields = this._fieldsStore.getNestedAllFields()
    this.onFieldsChange(changedFields, allFields)
  }

  onCollectValidate(name: string, action: string, ...args: unknown[]) {
    const { field, fieldMeta } = this.onCollectCommon(name, action, args)
    const newField = {
      ...field,
      dirty: true,
    }

    this._fieldsStore.setFieldsAsDirty()

    this.validateFieldsInternal([newField], {
      action,
      options: {
        firstFields: !!fieldMeta.validateFirst,
      },
    })
  }

  onCollectCommon(name: string, action: string, args: unknown[]) {
    const field = this._fieldsStore.getField(name)
    const fieldMeta = this._fieldsStore.getFieldMeta(name)
    const { fieldElem } = fieldMeta

    const value = getValueFromEvent(args[0] as Parameters<typeof getValueFromEvent>[0])
    const oldValue = this._fieldsStore.getFieldValue(name)

    // set field value
    if (value !== oldValue) {
      if (fieldElem.value !== value) {
        fieldElem.value = value
      }

      // trigger onValuesChange
      const changedValues = { [name]: value }
      const allValues = this._fieldsStore.getAllValues()
      this.onValuesChange(changedValues, { ...allValues, ...changedValues })
    }

    return {
      name,
      field: {
        ...field,
        value,
        touched: true,
      },
      fieldMeta,
    }
  }

  onCollect(name_: string, action: string, ...args: unknown[]) {
    const { name, field, fieldMeta } = this.onCollectCommon(name_, action, args)

    const { validate } = fieldMeta

    this._fieldsStore.setFieldsAsDirty()

    const newField = {
      ...field,
      dirty: hasRules(validate),
    }

    this.setFields({ [name]: newField })
  }

  setFieldsValue(changedValues: Record<string, unknown>, callback?: () => void) {
    const { fieldsMeta } = this._fieldsStore
    const values = this._fieldsStore.flattenRegisteredFields(changedValues)
    const newFields = Object.keys(values).reduce((acc, name) => {
      const isRegistered = fieldsMeta[name]
      if (isRegistered) {
        const value = values[name]
        acc[name] = {
          value,
        }
      }
      return acc
    }, {})
    this.setFields(newFields, callback)
    const allValues = this._fieldsStore.getAllValues()
    this.onValuesChange(changedValues, allValues)
  }

  resetFields(ns?: string[] | string) {
    const names = typeof ns === 'undefined' ? ns : Array.isArray(ns) ? ns : [ns]
    const newFields = this._fieldsStore.resetFields(names)
    if (Object.keys(newFields).length > 0) {
      this.setFields(newFields)
    }

    if (ns) {
      const names = Array.isArray(ns) ? ns : [ns]
      names.forEach((name) => delete this._clearedFieldMetaCache[name])
    } else {
      this._clearedFieldMetaCache = {}
    }
  }

  validateFieldsInternal(
    fields: FormFieldState[],
    { fieldNames, action, options = {} }: { fieldNames?: string[]; action?: string; options?: Record<string, unknown> },
    callback?: (errors: Record<string, unknown> | null, values: Record<string, unknown>) => void,
  ) {
    const allRules: Record<string, FormRule[]> = {}
    const allValues: Record<string, unknown> = {}
    const allFields: Record<string, FormFieldState> = {}
    const alreadyErrors: Record<string, unknown> = {}
    fields.forEach((field) => {
      const name = field.name
      if (options.force !== true && field.dirty === false) {
        if (field.errors) {
          set(alreadyErrors, name, { errors: field.errors })
        }
        return
      }
      const fieldMeta = this._fieldsStore.getFieldMeta(name)
      const newField = {
        ...field,
      }
      newField.errors = undefined
      newField.validating = true
      newField.dirty = true
      allRules[name] = this.getRules(fieldMeta, action)
      allValues[name] = newField.value
      allFields[name] = newField
    })
    this.setFields(allFields)
    // in case normalize
    Object.keys(allValues).forEach((f) => {
      allValues[f] = this._fieldsStore.getFieldValue(f)
    })
    if (callback && isEmptyObject(allFields)) {
      callback(isEmptyObject(alreadyErrors) ? null : alreadyErrors, this._fieldsStore.getFieldsValue(fieldNames))
      return
    }
    const validator = new AsyncValidator(allRules)
    const { validateMessages } = this
    if (validateMessages) {
      validator.messages(validateMessages)
    }
    validator.validate(allValues, options, (errors) => {
      const errorsGroup = {
        ...alreadyErrors,
      }
      if (errors && errors.length) {
        errors.forEach((e) => {
          const errorFieldName = e.field
          let fieldName = errorFieldName

          // Handle using array validation rule.
          Object.keys(allRules).some((ruleFieldName) => {
            const rules = allRules[ruleFieldName] || []

            // Exist if match rule
            if (ruleFieldName === errorFieldName) {
              fieldName = ruleFieldName
              return true
            }

            // Skip if not match array type
            if (rules.every(({ type }) => type !== 'array') || errorFieldName.indexOf(`${ruleFieldName}.`) !== 0) {
              return false
            }

            // Exist if match the field name
            const restPath = errorFieldName.slice(ruleFieldName.length + 1)
            if (/^\d+$/.test(restPath)) {
              fieldName = ruleFieldName
              return true
            }

            return false
          })

          const field = get(errorsGroup, fieldName)
          if (typeof field !== 'object' || Array.isArray(field)) {
            set(errorsGroup, fieldName, { errors: [] })
          }
          const fieldErrors = get(errorsGroup, fieldName.concat('.errors')) as unknown[]
          fieldErrors.push(e)
        })
      }
      const expired: Array<{ name: string }> = []
      const nowAllFields: Record<string, FormFieldState> = {}
      Object.keys(allRules).forEach((name) => {
        const fieldErrors = get(errorsGroup, name) as { errors?: FormFieldState['errors'] } | undefined
        const nowField = this._fieldsStore.getField(name)
        // avoid concurrency problems
        if (!eq(nowField.value, allValues[name])) {
          expired.push({
            name,
          })
        } else {
          nowField.errors = fieldErrors && fieldErrors.errors
          nowField.value = allValues[name]
          nowField.validating = false
          nowField.dirty = false
          nowAllFields[name] = nowField
        }
      })
      this.setFields(nowAllFields)
      if (callback) {
        if (expired.length) {
          expired.forEach(({ name }) => {
            const fieldErrors = [
              {
                message: `${name} need to revalidate`,
                field: name,
              },
            ]
            set(errorsGroup, name, {
              expired: true,
              errors: fieldErrors,
            })
          })
        }

        callback(isEmptyObject(errorsGroup) ? null : errorsGroup, this._fieldsStore.getFieldsValue(fieldNames))
      }
    })
  }

  validateFields(
    ns?: string[] | string | ((errors: Record<string, unknown> | null, values: Record<string, unknown>) => void),
    opt?: Record<string, unknown> | ((errors: Record<string, unknown> | null, values: Record<string, unknown>) => void),
    cb?: (errors: Record<string, unknown> | null, values: Record<string, unknown>) => void,
  ) {
    const pending = new Promise((resolve, reject) => {
      const { names, options } = getParams(ns, opt, cb)
      let { callback } = getParams(ns, opt, cb)
      if (!callback || typeof callback === 'function') {
        const oldCb = callback
        callback = (errors, values) => {
          if (oldCb) {
            oldCb(errors, values)
          }
          if (errors) {
            reject({ errors, values })
          } else {
            resolve(values)
          }
        }
      }
      const fieldNames = names ? this._fieldsStore.getValidFieldsFullName(names) : this._fieldsStore.getValidFieldsName()
      const fields = fieldNames
        .filter((name) => {
          const fieldMeta = this._fieldsStore.getFieldMeta(name)
          return hasRules(fieldMeta.validate)
        })
        .map((name) => {
          const field = this._fieldsStore.getField(name)
          field.value = this._fieldsStore.getFieldValue(name)
          return field
        })
      if (!fields.length) {
        callback(null, this._fieldsStore.getFieldsValue(fieldNames))
        return
      }
      if (!('firstFields' in options)) {
        options.firstFields = fieldNames.filter((name) => {
          const fieldMeta = this._fieldsStore.getFieldMeta(name)
          return !!fieldMeta.validateFirst
        })
      }
      this.validateFieldsInternal(
        fields,
        {
          fieldNames,
          options,
        },
        callback,
      )
    })
    pending.catch((e) => {
      // eslint-disable-next-line no-console
      if (console.error) {
        // eslint-disable-next-line no-console
        console.error(e)
      }
      return e
    })
    return pending
  }

  getRules(fieldMeta: FormFieldMeta, action?: string) {
    const actionRules = fieldMeta.validate
      .filter((item) => {
        return !action || item.trigger.indexOf(action) >= 0
      })
      .map((item) => item.rules)
    return flattenArray(actionRules)
  }

  getFieldInstance(name: string) {
    return this._instances[name]
  }

  getCacheBind(name: string, action: string, fn: (...args: unknown[]) => void) {
    if (!this._cachedBind[name]) {
      this._cachedBind[name] = {}
    }
    const cache = this._cachedBind[name]
    if (!cache[action] || cache[action].oriFn !== fn) {
      cache[action] = {
        fn: fn.bind(this, name, action),
        oriFn: fn,
      }
    }
    return cache[action].fn
  }

  getFieldDecorator(name: string, fieldData: FieldData, fieldElem: FieldInstance) {
    const props = this.getFieldProps(name, fieldData, fieldElem)

    return (inputElem: InputInstanceLike) => {
      // We should put field in record if it is rendered
      this._renderFields[name] = true

      const fieldMeta = this._fieldsStore.getFieldMeta(name)

      fieldMeta.inputElem = inputElem
      this.patchFormBridge(name, inputElem)

      const decoratedFieldProps = {
        ...props,
        ...this._fieldsStore.getFieldValuePropValue(fieldMeta),
      }

      return decoratedFieldProps
    }
  }

  getFieldProps(name: string, fieldData: FieldData, fieldElem: FieldInstance) {
    delete this._clearedFieldMetaCache[name]

    const rules = transformRules(fieldData.rules)
    const {
      initialValue,
      trigger = DEFAULT_TRIGGER,
      valuePropName,
      validate = [],
      validateTrigger = [DEFAULT_TRIGGER],
      preserve,
      // rules,
      validateFirst,
      hidden,
    } = fieldData
    const fieldOption: FormFieldMeta = {
      name,
      // initialValue,
      trigger,
      valuePropName,
      validate,
      validateTrigger,
      preserve,
      rules,
      validateFirst,
      hidden,
    }

    if (!isNullValue(initialValue)) {
      fieldOption.initialValue = initialValue
    }

    const inputProps: Partial<FormInputProps> = {
      ...this._fieldsStore.getFieldValuePropValue(fieldOption),
    }

    const fieldMeta = this._fieldsStore.getFieldMeta(name)
    if ('initialValue' in fieldOption) {
      fieldMeta.initialValue = fieldOption.initialValue
    }
    fieldMeta.fieldElem = fieldElem

    const validateRules = normalizeValidateRules(validate, rules, validateTrigger)

    const meta = {
      ...fieldMeta,
      ...fieldOption,
      validate: validateRules,
    }

    this._fieldsStore.setFieldMeta(name, meta)
    this._formBridges[name] = this.createFormBridge(name)

    // fix errors
    this.setFieldsAsErrors(name, meta)

    const { fieldElem: __fieldElem, inputElem: __inputElem, ...fieldMetaProp } = meta

    // inject field
    inputProps[FIELD_META_PROP] = fieldMetaProp
    inputProps[FIELD_DATA_PROP] = this._fieldsStore.getField(name)

    return inputProps as FormInputProps
  }

  createFormBridge(name: string) {
    return {
      name,
      dispatch: (event: string, ...args: unknown[]) => {
        const fieldMeta = this._fieldsStore.getFieldMeta(name)
        const eventName = toFormEventName(event)
        const trigger = fieldMeta.trigger
        const validateTriggers = getValidateTriggers(fieldMeta.validate)

        validateTriggers.forEach((action) => {
          if (action === eventName) {
            this.onCollectValidate(name, action, ...args)
          }
        })

        // make sure that the value will be collect
        if (validateTriggers.indexOf(trigger) === -1) {
          if (trigger === eventName) {
            this.onCollect(name, trigger, ...args)
          }
        }
      },
    }
  }

  patchFormBridge(name: string, inputElem: InputInstanceLike) {
    const bridgeInput = inputElem as InputInstanceLike & {
      _formBridgeName?: string
      _formBridgeOriginalEmit?: Doraemon['$emit']
      _formBridgePatched?: boolean
    }
    const nameKey = '_formBridgeName'
    const emitKey = '_formBridgeOriginalEmit'
    const patchedKey = '_formBridgePatched'

    bridgeInput[nameKey] = name

    if (bridgeInput[patchedKey]) {
      return
    }

    bridgeInput[emitKey] = bridgeInput.$emit
    bridgeInput.$emit = (event: string, ...args: any[]) => {
      const bridgeName = bridgeInput[nameKey]
      const bridge = bridgeName ? this._formBridges[bridgeName] : undefined
      bridge?.dispatch(event, ...args)
      const originalEmit = bridgeInput[emitKey]
      return originalEmit.call(bridgeInput, event, ...args)
    }
    bridgeInput[patchedKey] = true
  }

  registerField(name: string, fieldElem: FieldInstance) {
    const action = `${name}__ref`
    const ref = this.getCacheBind(name, action, this.saveRef)
    ref(fieldElem)
    return () => {
      ref(null)
    }
  }

  getInternalHooks(key: string): FormHooks | null {
    if (key === 'FORM_HOOK_MARK') {
      return {
        registerField: this.registerField.bind(this),
        getFieldDecorator: this.getFieldDecorator.bind(this),
      }
    }
    warning(false, '`getInternalHooks` is internal usage of the <form />. Should not call directly.')
    return null
  }

  onValuesChange(changedValues: Record<string, unknown>, allValues: Record<string, unknown>) {
    this.$emit('change', { form: this, changedValues, allValues })
  }

  onFieldsChange(changedFields: Record<string, unknown>, allFields: Record<string, unknown>) {
    this.$emit('fieldsChange', { form: this, changedFields, allFields })
  }

  getFieldsValue(names?: string[]) {
    return this._fieldsStore.getFieldsValue(names)
  }

  getFieldValue(name: string) {
    return this._fieldsStore.getFieldValue(name)
  }

  setFieldsInitialValue(values: Record<string, unknown>) {
    this._fieldsStore.setFieldsInitialValue(values)
  }

  getFieldsError(names?: string[]) {
    return this._fieldsStore.getFieldsError(names)
  }

  getFieldError(name: string) {
    return this._fieldsStore.getFieldError(name)
  }

  isFieldValidating(name: string) {
    return this._fieldsStore.isFieldValidating(name)
  }

  isFieldsValidating(names?: string[]) {
    return this._fieldsStore.isFieldsValidating(names)
  }

  isFieldTouched(name: string) {
    return this._fieldsStore.isFieldTouched(name)
  }

  isFieldsTouched(names?: string[]) {
    return this._fieldsStore.isFieldsTouched(names)
  }

  created() {
    this._fieldsStore = createFieldsStore()
    this._renderFields = {}
    this._cachedBind = {}
    this._clearedFieldMetaCache = {}
    this._instances = {}
    this._formBridges = {}
  }
}

export { Form }

export default defineComponentHOC()(Form)
