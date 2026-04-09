import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'
import type { RadioChangeItem, RadioContext, SelectableChangeDetail } from './types'

const { classNames } = Doraemon.util

const defaultContext: RadioContext = {
  disabled: false,
  readOnly: false,
  hasLine: true,
  hasFieldDecorator: false,
  withListComponent: false,
  iconPosition: 'right',
  iconSize: '',
  iconOn: '',
  iconOff: '',
}

@Component({
  components: {
    RadioGroup: () => ({
      module: './group',
      type: 'ancestor',
    }),
  },
  props: {
    prefixCls: {
      type: String,
      default: 'dora-radio',
    },
    cellPrefixCls: {
      type: String,
      default: 'dora-list-item',
    },
    selectablePrefixCls: {
      type: String,
      default: 'dora-selectable',
    },
    thumb: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    label: {
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
  expose: ['check', 'uncheck', 'toggle', 'setChecked', 'changeValue', 'value', 'title'],
})
class Radio extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof Radio
   */
  prefixCls!: string

  /**
   * `dora-list-item` 组件的类名前缀
   *
   * @type {string}
   * @memberof Radio
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
   * @memberof Radio
   */
  @Prop({
    type: String,
    default: 'dora-selectable',
  })
  selectablePrefixCls: string

  /**
   * 缩略图
   *
   * @type {string}
   * @memberof Radio
   */
  @Prop({
    type: String,
    default: '',
  })
  thumb: string

  /**
   * 标题
   *
   * @type {string}
   * @memberof Radio
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
   * @memberof Radio
   */
  @Prop({
    type: String,
    default: '',
  })
  label: string

  /**
   * 值
   *
   * @type {string}
   * @memberof Radio
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
   * @memberof Radio
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
   * @memberof Radio
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
   * @memberof Radio
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
   * @memberof Radio
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
   * @memberof Radio
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
   * @memberof Radio
   */
  @Prop({
    type: Boolean,
    default: true,
  })
  hasLine: boolean

  inputChecked: boolean = false
  index: number = 0
  isLast: boolean = false
  context: RadioContext = defaultContext

  get classes() {
    const { prefixCls } = this
    const cell = classNames(prefixCls)
    const thumb = `${prefixCls}__thumb`
    const iconPosition = `${prefixCls}__icon-position`
    const iconSelectable = `${prefixCls}__icon-selectable`
    const selectable = `${prefixCls}__selectable`
    const selectableH = `${prefixCls}__selectable-horizontal`

    return {
      cell,
      thumb,
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

  radioChange(e: WechatMiniprogram.CustomEvent<SelectableChangeDetail>) {
    const { disabled, readOnly, context } = this
    const { checked } = e.detail

    if (disabled || context.disabled || readOnly || context.readOnly) return

    this.onChange(checked)
  }

  changeValue(inputChecked: boolean = false, index: number = 0, isLast: boolean = false, context: RadioContext = defaultContext) {
    this.inputChecked = inputChecked
    this.index = index
    this.isLast = isLast
    this.context = context
  }

  onChange(inputChecked: boolean) {
    const { value, index } = this
    const item: RadioChangeItem = {
      checked: inputChecked,
      value,
      index,
    }
    const parent = this.$parent as unknown as { onChange?: (item: RadioChangeItem) => void } | undefined
    if (parent && typeof parent.onChange === 'function') {
      parent.onChange(item)
    } else {
      if (this._renderProxy) {
        this._renderProxy.triggerEvent('change', item, { bubbles: true, composed: true })
      }
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

export { Radio }

export default defineComponentHOC()(Radio)
