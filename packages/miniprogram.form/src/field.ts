import { Component, defineComponentHOC, Doraemon, Watch } from '@doraemon-ui/miniprogram.core-js'
import type { MiniprogramDOMRect } from '@doraemon-ui/miniprogram.shared'
import { findComponentNode, useRect } from '@doraemon-ui/miniprogram.shared'

import type { ListItemInstance } from '../../miniprogram.list'
import { FIELD_DATA_PROP, FIELD_META_PROP } from './constants'
import type { FormFieldMeta, FormFieldState, FormRule, FormValidateConfig } from './form-store'
import { fieldProps } from './props'
import type { FieldData, FieldProps, FormContext, FormInstance, InputInstanceLike } from './types'
import warning from './warning'

const { classNames } = Doraemon.util

const intersperseSpace = (list: string[]): string[] => {
  return list.reduce((current, item) => [...current, ' ', item], []).slice(1)
}

const defaultContext: FormContext = {
  layout: 'horizontal',
  requiredMarkStyle: 'asterisk',
  asteriskText: '*',
  requiredText: '必填',
  optionalText: '选填',
  disabled: false,
  readOnly: false,
}

@Component({
  components: {
    Form: () => ({
      module: './index',
      type: 'ancestor',
    }),
    Input: () => ({
      module: '../miniprogram.input/index',
      type: 'descendant',
      observer: 'onChildrenChanged',
    }),
    // InputNumber: () => ({
    //   module: '../miniprogram.input-number/index',
    //   type: 'descendant',
    //   observer: 'onChildrenChanged',
    // }),
    // Picker: () => ({
    //   module: '../miniprogram.picker/index',
    //   type: 'descendant',
    //   observer: 'onChildrenChanged',
    // }),
    // DatePicker: () => ({
    //   module: '../miniprogram.date-picker/index',
    //   type: 'descendant',
    //   observer: 'onChildrenChanged',
    // }),
    // PopupSelect: () => ({
    //   module: '../miniprogram.popup-select/index',
    //   type: 'descendant',
    //   observer: 'onChildrenChanged',
    // }),
    // Textarea: () => ({
    //   module: '../miniprogram.textarea/index',
    //   type: 'descendant',
    //   observer: 'onChildrenChanged',
    // }),
    // Switch: () => ({
    //   module: '../miniprogram.switch/index',
    //   type: 'descendant',
    //   observer: 'onChildrenChanged',
    // }),
    // Selectable: () => ({
    //   module: '../miniprogram.selectable/index',
    //   type: 'descendant',
    //   observer: 'onChildrenChanged',
    // }),
    // CheckboxGroup: () => ({
    //   module: '../miniprogram.checkbox/group',
    //   type: 'descendant',
    //   observer: 'onChildrenChanged',
    // }),
    // RadioGroup: () => ({
    //   module: '../miniprogram.radio/group',
    //   type: 'descendant',
    //   observer: 'onChildrenChanged',
    // }),
    // SelectorGroup: () => ({
    //   module: '../miniprogram.selector-group/index',
    //   type: 'descendant',
    //   observer: 'onChildrenChanged',
    // }),
    // Rater: () => ({
    //   module: '../miniprogram.rater/index',
    //   type: 'descendant',
    //   observer: 'onChildrenChanged',
    // }),
    // Slider: () => ({
    //   module: '../miniprogram.slider/index',
    //   type: 'descendant',
    //   observer: 'onChildrenChanged',
    // }),
  },
  props: fieldProps,
})
class Field extends Doraemon {
  prefixCls!: string
  initialValue!: unknown
  valuePropName!: string
  trigger!: string
  validate!: FormValidateConfig[]
  validateTrigger!: string | string[]
  preserve!: boolean
  rules!: FormRule[]
  validateFirst!: boolean
  hidden!: boolean
  childElementPosition!: string
  cellPrefixCls!: string
  label!: string
  labelWrap!: boolean
  extra!: string
  isLink!: boolean
  align!: string
  disabled!: boolean
  readOnly!: boolean

  validateStatus!: unknown
  required!: unknown
  help!: unknown
  hasFeedback!: boolean

  name!: string
  value!: unknown

  index: number = 0
  isLast: boolean = false
  context: FormContext = defaultContext
  popoverVisible: boolean = false
  slotRect: MiniprogramDOMRect | null = null
  relativeRect: MiniprogramDOMRect | null = null

  mergedValidateStatus: string = ''
  mergedRequired: boolean = false
  feedbackMessage: string | string[] = ''
  validateClasses: string = ''

  _cancelRegister: null | (() => void) = null

  get classes() {
    const { prefixCls, childElementPosition, labelWrap } = this
    return {
      wrap: classNames(prefixCls),
      child: classNames(`${prefixCls}__child`, {
        [`${prefixCls}__child--position-${childElementPosition}`]: childElementPosition,
      }),
      label: classNames(`${prefixCls}__label`, {
        [`${prefixCls}__label--wrap`]: labelWrap,
      }),
      extra: `${prefixCls}__extra`,
      arrow: `${prefixCls}__arrow`,
      asterisk: `${prefixCls}__required-asterisk`,
      text: `${prefixCls}__required-text`,
      feedback: `${prefixCls}__feedback-message`,
      labelHelp: `${prefixCls}__label-help`,
    }
  }

  @Watch('initialValue')
  onInitialValueChange(initialValue: unknown) {
    this.changeValue(initialValue)
  }

  @Watch('valuePropName')
  @Watch('trigger')
  @Watch('validate')
  @Watch('validateTrigger')
  @Watch('preserve')
  @Watch('rules')
  @Watch('validateFirst')
  @Watch('hidden')
  onFieldConfigChange() {
    this.changeValue()
  }

  onChildrenChanged() {
    this.changeValue()
  }

  getFormContext() {
    return this.$parent as FormInstance | undefined
  }

  getChildNodes() {
    return this.$children as InputInstanceLike[]
  }

  changeContext(index: number, isLast: boolean, context: Partial<FormContext>) {
    const nextContext = {
      ...defaultContext,
      ...this.context,
      ...context,
    }
    this.index = index
    this.isLast = isLast
    this.context = nextContext
  }

  setPopoverVisible() {
    const popoverVisible = !this.popoverVisible
    const promise = popoverVisible ? this.getPopoverRects() : Promise.resolve([null, null])
    promise.then(([slotRect, relativeRect]) => {
      if (slotRect && relativeRect) {
        this.slotRect = slotRect
        this.relativeRect = relativeRect
        this.popoverVisible = popoverVisible
      } else {
        this.popoverVisible = popoverVisible
      }
    })
  }

  getPopoverRects() {
    const getSlotRect = () => useRect(`.${this.prefixCls}__label-help`, this._renderProxy).then((rect) => rect || null)
    const getRelativeRect = () =>
      new Promise<MiniprogramDOMRect>((resolve) => {
        const fieldWrap = findComponentNode('#dora-field-wrap', this._renderProxy) as ListItemInstance | undefined
        if (fieldWrap) {
          fieldWrap.getBoundingClientRect().then((rect) => {
            resolve(rect)
          })
        } else {
          resolve(null)
        }
      })
    return Promise.all([getSlotRect(), getRelativeRect()])
  }

  getFieldData(): FieldData {
    return {
      name: this.name,
      initialValue: this.initialValue,
      trigger: this.trigger,
      valuePropName: this.valuePropName,
      validate: this.validate,
      validateTrigger: this.validateTrigger,
      preserve: this.preserve,
      rules: this.rules,
      validateFirst: this.validateFirst,
      hidden: this.hidden,
    }
  }

  changeValue(value = this.value) {
    // set value
    if (this.value !== value) {
      this.value = value
    }

    const elements = this.getChildNodes()
    const valuePropName = this.valuePropName

    if (elements.length > 0) {
      elements.forEach((inputElem) => {
        inputElem.hasFieldDecorator = true
        if (valuePropName in inputElem) {
          inputElem[valuePropName] = value
        }
        Doraemon.nextTick(() => {
          this.forceUpdate(inputElem)
        })
      })
    }
  }

  forceUpdate(inputElem?: InputInstanceLike, callback?: () => void) {
    const formContext = this.getFormContext()
    if (!formContext) {
      warning(false, `Field<${this.name}> instance is not connected to any Form element.Forgot to use <dora-form />?`)
      return
    }

    const { getFieldDecorator } = formContext.getInternalHooks('FORM_HOOK_MARK')
    const fieldData = this.getFieldData()
    const { name } = fieldData
    const inputProps = getFieldDecorator(name, fieldData, this)(inputElem)
    const finallyCb = () => {
      callback?.()
      this.updateValidateState(this)
    }

    for (const key in inputProps) {
      if (key in inputElem) {
        inputElem[key] = inputProps[key]
      }
    }
    Doraemon.nextTick(finallyCb)
  }

  mounted() {
    const formContext = this.getFormContext()
    if (formContext) {
      const { registerField } = formContext.getInternalHooks('FORM_HOOK_MARK')
      this._cancelRegister = registerField(this.name, this)
    }
  }

  destroyed() {
    this._cancelRegister?.()
    this._cancelRegister = null
  }

  getControls() {
    return this.getChildNodes().filter((node) => !!node.hasFieldDecorator)
  }

  getOnlyControl() {
    const child = this.getControls()[0]
    return child !== undefined ? child : null
  }

  getChildProp(prop: string) {
    const child = this.getOnlyControl()
    return child && child.$data && child.$data[prop]
  }

  getMeta() {
    return this.getChildProp(FIELD_META_PROP) as FormFieldMeta | undefined
  }

  getField() {
    return this.getChildProp(FIELD_DATA_PROP) as FormFieldState | undefined
  }

  getValidateState(_fieldMeta?: FormFieldMeta, _field?: FormFieldState) {
    const onlyControl = this.getOnlyControl()
    if (!onlyControl) {
      return ''
    }
    const fieldMeta = _fieldMeta || this.getMeta()
    const field = _field || this.getField()
    if (field.validating) {
      return 'validating'
    }
    if (field.errors) {
      return 'error'
    }
    const fieldValue = 'value' in field ? field.value : fieldMeta.initialValue
    if (fieldValue !== undefined && fieldValue !== null && fieldValue !== '') {
      return 'success'
    }
    return ''
  }

  getRequiredState(required: unknown) {
    if (required !== null) {
      return !!required
    }
    if (this.getOnlyControl()) {
      const meta = this.getMeta()
      const validate = meta?.validate || []

      return validate
        .filter((item) => !!item.rules)
        .some((item) => {
          return item.rules.some((rule) => rule.required)
        })
    }
    return false
  }

  getFeedbackMessage(help: unknown) {
    // if (help !== null) {
    //     return help
    // }
    if (this.getOnlyControl()) {
      const { errors } = this.getField()
      if (errors) {
        return intersperseSpace(errors.map((e) => e.message))
      }
    }
    return ''
  }

  getValidateClasses(mergedValidateStatus: string, hasFeedback: boolean, help: unknown) {
    if (mergedValidateStatus) {
      return classNames({
        // 'with-help': help !== null,
        // 'has-feedback': mergedValidateStatus && hasFeedback,
        'has-success': mergedValidateStatus === 'success',
        'has-warning': mergedValidateStatus === 'warning',
        'has-error': mergedValidateStatus === 'error',
        'is-validating': mergedValidateStatus === 'validating',
      })
    }
    return ''
  }

  updateValidateState(props: FieldProps) {
    const mergedValidateStatus = props.validateStatus !== null ? `${props.validateStatus}` : this.getValidateState()
    if (this.mergedValidateStatus !== mergedValidateStatus) {
      this.mergedValidateStatus = mergedValidateStatus
    }

    const mergedRequired = this.getRequiredState(props.required)
    if (this.mergedRequired !== mergedRequired) {
      this.mergedRequired = mergedRequired
    }

    const feedbackMessage = this.getFeedbackMessage(props.help)
    if (this.feedbackMessage !== feedbackMessage) {
      this.feedbackMessage = feedbackMessage
    }

    const validateClasses = this.getValidateClasses(mergedValidateStatus, props.hasFeedback, props.help)
    if (this.validateClasses !== validateClasses) {
      this.validateClasses = validateClasses
    }
  }
}

export { Field }

export default defineComponentHOC({ behaviors: ['wx://form-field'] })(Field)
