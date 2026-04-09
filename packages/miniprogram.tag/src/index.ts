import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'
const { classNames, styleToCssString } = Doraemon.util

const isPresetColor = (color: string) =>
  /^(pink|red|yellow|orange|cyan|green|blue|purple|geekblue|magenta|volcano|gold|lime)(-inverse)?$/.test(color)

@Component({
  props: {
    prefixCls: {
      type: String,
      default: 'dora-tag',
    },
  },
})
class Tag extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof Tag
   */
  prefixCls!: string

  /**
   * 点击态类名
   *
   * @type {string}
   * @memberof Tag
   */
  @Prop({
    type: String,
    default: 'default',
  })
  hoverClass: string

  /**
   * 标签颜色
   *
   * @type {string}
   * @memberof Tag
   */
  @Prop({
    type: String,
    default: '',
  })
  color: string

  /**
   * 是否可关闭
   *
   * @type {boolean}
   * @memberof Tag
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  closable: boolean

  /**
   * 默认是否可见
   *
   * @type {boolean}
   * @memberof Tag
   */
  @Prop({
    type: Boolean,
    default: true,
  })
  defaultVisible: boolean

  /**
   * 是否可见
   *
   * @type {boolean}
   * @memberof Tag
   */
  @Prop({
    type: Boolean,
    default: true,
  })
  visible: boolean

  /**
   * 是否受控
   *
   * @type {boolean}
   * @memberof Tag
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  controlled: boolean

  className: string = ''
  tagStyle: string = ''
  tagVisible: boolean = true

  get classes() {
    const p = this.prefixCls
    const hover = this.hoverClass && this.hoverClass !== 'default' ? this.hoverClass : `${p}--hover`
    return { wrap: classNames(p), icon: `${p}__icon`, hover }
  }

  @Watch('visible')
  onVisibleChange(v: boolean) {
    if (this.controlled) this.updated(v)
  }

  @Watch('color')
  onColorChange(c: string) {
    this.updateStyle(c)
  }

  updated(tagVisible: boolean) {
    if (this.tagVisible !== tagVisible) this.tagVisible = tagVisible
  }

  updateStyle(color: string) {
    const isPreset = isPresetColor(color)
    this.className = isPreset ? `${this.prefixCls}--${color}` : ''
    this.tagStyle = !isPreset && color ? styleToCssString({ backgroundColor: color, color: '#fff' }) : ''
  }

  onChange(tagVisible: boolean) {
    if (!this.controlled) this.updated(tagVisible)
    this.$emit('change', { value: tagVisible })
  }

  onClick() {
    this.$emit('click')
  }

  onClose() {
    if (this.closable) {
      this.$emit('close')
      this.onChange(false)
    }
  }

  mounted() {
    this.updated(this.controlled ? this.visible : this.defaultVisible)
    this.updateStyle(this.color)
  }
}

export { Tag }

export default defineComponentHOC()(Tag)
