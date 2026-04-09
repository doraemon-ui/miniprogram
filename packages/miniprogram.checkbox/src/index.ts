import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'
import type { CustomEvent } from '@doraemon-ui/miniprogram.core-js'
import { getDefaultContext } from '@doraemon-ui/miniprogram.shared'
import { checkboxGroupProps } from './props'
import type { CheckboxChangeDetail, CheckboxChangeItem, CheckboxContext, CheckboxGroupInstance } from './types'

const { classNames } = Doraemon.util

const defaultContext: CheckboxContext = {
  ...(getDefaultContext(checkboxGroupProps, [
    'disabled',
    'readOnly',
    'hasLine',

    // only context
    'hasFieldDecorator',
    'withListComponent',
    'iconPosition',
    'iconSize',
    'iconOn',
    'iconOff',
  ]) as Partial<CheckboxContext>),
  withListComponent: false,
}

@Component({
  components: {
    CheckboxGroup: () => ({
      module: './group',
      type: 'ancestor',
    }),
  },
  props: {
    prefixCls: {
      type: String,
      default: 'dora-checkbox',
    },
    cellPrefixCls: {
      type: String,
      default: 'dora-list-item',
    },
    selectablePrefixCls: {
      type: String,
      default: 'dora-selectable',
    },
    title: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    extra: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    checked: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: 'balanced',
    },
    wrapStyle: {
      type: null,
      default: '',
    },
    hasLine: {
      type: Boolean,
      default: true,
    },
  },
  expose: ['check', 'uncheck', 'toggle', 'setChecked', 'changeValue'],
})
class Checkbox extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof Checkbox
   */
  prefixCls!: string

  /**
   * `dora-list-item` 组件的类名前缀
   *
   * @type {string}
   * @memberof Checkbox
   */
  @Prop({
    type: String,
    default: 'dora-list-item',
  })
  cellPrefixCls: string

  /**
   * `dora-selectable` 组件的类名前缀
   *
   * @type {string}
   * @memberof Checkbox
   */
  @Prop({
    type: String,
    default: 'dora-selectable',
  })
  selectablePrefixCls: string

  /**
   * 标题
   *
   * @type {string}
   * @memberof Checkbox
   */
  @Prop({
    type: String,
    default: '',
  })
  title: string

  /**
   * 描述
   *
   * @type {string}
   * @memberof Checkbox
   */
  @Prop({
    type: String,
    default: '',
  })
  label: string

  /**
   * 额外信息（仅在 `withListComponent` 且 `iconPosition='left'` 时展示）
   *
   * @type {string}
   * @memberof Checkbox
   */
  @Prop({
    type: String,
    default: '',
  })
  extra: string

  /**
   * 值
   *
   * @type {string}
   * @memberof Checkbox
   */
  @Prop({
    type: String,
    default: '',
  })
  value: string

  /**
   * 是否选中（受控）
   *
   * @type {boolean}
   * @memberof Checkbox
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  checked: boolean

  /**
   * 是否禁用
   *
   * @type {boolean}
   * @memberof Checkbox
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  disabled: boolean

  /**
   * 是否只读
   *
   * @type {boolean}
   * @memberof Checkbox
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  readOnly: boolean

  /**
   * 选中颜色，支持预设色值或自定义色值
   *
   * @type {string}
   * @memberof Checkbox
   */
  @Prop({
    type: String,
    default: 'balanced',
  })
  color: string

  /**
   * 自定义样式
   *
   * @type {(string | Partial<CSSStyleDeclaration>)}
   * @memberof Checkbox
   */
  @Prop({
    type: null,
    default: '',
  })
  wrapStyle: string | Partial<CSSStyleDeclaration>

  /**
   * 是否有底部横线
   *
   * @type {boolean}
   * @memberof Checkbox
   */
  @Prop({
    type: Boolean,
    default: true,
  })
  hasLine: boolean

  inputChecked: boolean = false
  index: number = 0
  isLast: boolean = false
  context: CheckboxContext = defaultContext

  get classes() {
    const { prefixCls } = this
    const cell = classNames(prefixCls)
    const extra = `${prefixCls}__extra`
    const iconPosition = `${prefixCls}__icon-position`
    const iconSelectable = `${prefixCls}__icon-selectable`
    const selectable = `${prefixCls}__selectable`
    const selectableH = `${prefixCls}__selectable-horizontal`

    return {
      cell,
      extra,
      iconPosition,
      iconSelectable,
      selectable,
      selectableH,
    }
  }

  @Watch('checked')
  onCheckedChange(newVal: boolean) {
    this.inputChecked = newVal
  }

  checkboxChange(e: CustomEvent<CheckboxChangeDetail>) {
    const { disabled, readOnly, context } = this
    const { checked } = e.currentTarget

    if (disabled || context.disabled || readOnly || context.readOnly) return

    this.onChange(checked)
  }

  changeValue(inputChecked: boolean = false, index: number = 0, isLast: boolean = false, context: CheckboxContext = defaultContext) {
    this.inputChecked = inputChecked
    this.index = index
    this.isLast = isLast
    this.context = context
  }

  onChange(inputChecked: boolean) {
    const { value, index } = this
    const item: CheckboxChangeItem = {
      checked: inputChecked,
      value,
      index,
    }
    const parent = this.$parent as CheckboxGroupInstance | undefined
    if (parent && typeof parent.onChange === 'function') {
      parent.onChange(item)
    } else {
      this.$emit('change', item)
    }
  }

  setChecked(inputChecked: boolean) {
    if (this.inputChecked !== inputChecked) {
      this.inputChecked = inputChecked
    }
    this.onChange(inputChecked)
  }

  check() {
    this.setChecked(true)
  }

  uncheck() {
    this.setChecked(false)
  }

  toggle() {
    this.setChecked(!this.inputChecked)
  }

  mounted() {
    this.inputChecked = this.checked
  }
}

export { Checkbox }

export default defineComponentHOC()(Checkbox)
