import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'
import type { CustomEvent } from '@doraemon-ui/miniprogram.core-js'
import { getPresetColor } from '@doraemon-ui/miniprogram.shared'

const { classNames } = Doraemon.util

@Component({
  props: {
    prefixCls: {
      type: String,
      default: 'dora-switch',
    },
  },
})
class Switch extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof Switch
   */
  prefixCls!: string

  /**
   * 当前值
   *
   * @type {boolean}
   * @memberof Switch
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  value: boolean

  /**
   * 是否禁用
   *
   * @type {boolean}
   * @memberof Switch
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  disabled: boolean

  /**
   * 是否加载中
   *
   * @type {boolean}
   * @memberof Switch
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  loading: boolean

  /**
   * 主题色
   *
   * @type {string}
   * @memberof Switch
   */
  @Prop({
    type: String,
    default: 'balanced',
  })
  color: string

  /**
   * 选中文案
   *
   * @type {string}
   * @memberof Switch
   */
  @Prop({
    type: String,
    default: '',
  })
  checkedText: string

  /**
   * 未选中文案
   *
   * @type {string}
   * @memberof Switch
   */
  @Prop({
    type: String,
    default: '',
  })
  uncheckedText: string

  inputStyle: string = ''
  inputChecked: boolean = false

  get classes() {
    const { prefixCls, inputChecked, disabled, loading, color } = this
    const wrap = classNames(prefixCls, {
      [`${prefixCls}--${color}`]: !!color,
      [`${prefixCls}--checked`]: inputChecked,
      [`${prefixCls}--disabled`]: disabled || loading,
    })
    const input = classNames(`${prefixCls}__input`, {
      [`${prefixCls}__input--checked`]: inputChecked,
      [`${prefixCls}__input--disabled`]: disabled || loading,
    })
    return {
      wrap,
      input,
      text: `${prefixCls}__text`,
      spin: `${prefixCls}__spin`,
    }
  }

  updated(inputChecked: boolean) {
    if (this.inputChecked !== inputChecked) this.inputChecked = inputChecked
  }

  @Watch('value')
  onValueChange(v: boolean) {
    this.updated(v)
  }

  @Watch('color')
  onColorChange(c: string) {
    const newColor = getPresetColor(c)
    this.inputStyle = `border-color:${newColor};background-color:${newColor};`
  }

  onTap(_e: CustomEvent) {
    if (this.disabled || this.loading) return
    this.$emit('change', { value: !this.inputChecked })
  }

  mounted() {
    this.updated(this.value)
    this.onColorChange(this.color)
  }
}

export { Switch }

export default defineComponentHOC()(Switch)
