import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'
import type { CustomEvent } from '@doraemon-ui/miniprogram.core-js'
import { useRectAll } from '@doraemon-ui/miniprogram.shared'

const { classNames } = Doraemon.util

@Component({
  props: {
    prefixCls: {
      type: String,
      default: 'dora-rater',
    },
  },
})
class Rater extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof Rater
   */
  prefixCls!: string

  /**
   * 最大评分数
   *
   * @type {number}
   * @memberof Rater
   */
  @Prop({
    type: Number,
    default: 5,
  })
  max: number

  /**
   * 图标
   *
   * @type {string}
   * @memberof Rater
   */
  @Prop({
    type: String,
    default: '',
  })
  icon: string

  /**
   * 星字符
   *
   * @type {string}
   * @memberof Rater
   */
  @Prop({
    type: String,
    default: '★',
  })
  star: string

  /**
   * 默认值
   *
   * @type {number}
   * @memberof Rater
   */
  @Prop({
    type: Number,
    default: 0,
  })
  defaultValue: number

  /**
   * 当前值
   *
   * @type {number}
   * @memberof Rater
   */
  @Prop({
    type: Number,
    default: 0,
  })
  value: number

  /**
   * 激活颜色
   *
   * @type {string}
   * @memberof Rater
   */
  @Prop({
    type: String,
    default: '#ffc900',
  })
  activeColor: string

  /**
   * 间距
   *
   * @type {number}
   * @memberof Rater
   */
  @Prop({
    type: Number,
    default: 2,
  })
  margin: number

  /**
   * 字号
   *
   * @type {number}
   * @memberof Rater
   */
  @Prop({
    type: Number,
    default: 25,
  })
  fontSize: number

  /**
   * 是否禁用
   *
   * @type {boolean}
   * @memberof Rater
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  disabled: boolean

  /**
   * 是否允许半星
   *
   * @type {boolean}
   * @memberof Rater
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  allowHalf: boolean

  /**
   * 是否允许清空
   *
   * @type {boolean}
   * @memberof Rater
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  allowClear: boolean

  /**
   * 是否允许滑动选择
   *
   * @type {boolean}
   * @memberof Rater
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  allowTouchMove: boolean

  /**
   * 是否受控
   *
   * @type {boolean}
   * @memberof Rater
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  controlled: boolean

  inputValue: number = -1
  hasFieldDecorator: boolean = false
  stars: number[] = []
  colors: string[] = []
  cutIndex: number = 0
  cutPercent: number = 0

  get classes() {
    const { prefixCls, disabled } = this
    const wrap = classNames(prefixCls, {
      [`${prefixCls}--disabled`]: disabled,
    })
    return {
      wrap,
      star: `${prefixCls}__star`,
      box: `${prefixCls}__box`,
      inner: `${prefixCls}__inner`,
      outer: `${prefixCls}__outer`,
      icon: `${prefixCls}__icon`,
    }
  }

  @Watch('inputValue')
  @Watch('max')
  @Watch('activeColor')
  onRecalc() {
    const stars = [...new Array(this.max)].map((_, i) => i)
    const colors = stars.map((i) => (i <= this.inputValue - 1 ? this.activeColor : '#ccc'))
    const split = this.inputValue.toString().split('.')
    const slice = split.length === 1 ? [split[0], '0'] : split
    this.stars = stars
    this.colors = colors
    this.cutIndex = Number(slice[0])
    this.cutPercent = Number(slice[1]) * 10
  }

  @Watch('value')
  onValueChange(newVal: number) {
    if (this.controlled) this.setValue(newVal)
  }

  @Watch('max')
  onMaxChange() {
    this.setValue(this.inputValue)
  }

  updated(v: number) {
    if (!this.hasFieldDecorator && this.inputValue !== v) {
      this.inputValue = v
    }
  }

  setValue(value: number) {
    const inputValue = value <= 0 ? 0 : value > this.max ? this.max : value
    this.updated(inputValue)
  }

  updateHalfStarValue(index: number, x: number, cb: (v: number, i: number) => void) {
    useRectAll(`.${this.prefixCls}__star`, this._renderProxy).then((rects) => {
      if (rects.filter((n) => !n).length) return
      const rect = rects[index]
      const has = x - rect.left < rect.width / 2
      const value = has ? index + 0.5 : index + 1
      cb.call(this, value, index)
    })
  }

  onTap(e: CustomEvent<{ index: number }>) {
    const { index } = e.currentTarget.dataset
    if (this.disabled) return
    if (!this.allowHalf) {
      const value = index + 1
      const isReset = this.allowClear && value === this.inputValue
      this.onChange(isReset ? 0 : value, index)
    } else {
      this.updateHalfStarValue(index, (e.detail as { x?: number })?.x || 0, (value, i) => {
        const isReset = this.allowClear && value === this.inputValue
        this.onChange(isReset ? 0 : value, i)
      })
    }
  }

  onChange(value: number, index: number) {
    if (!this.controlled) this.setValue(value)
    this.$emit('change', { value, index })
  }

  onTouchMove(e: WechatMiniprogram.TouchEvent) {
    if (this.disabled || !this.allowTouchMove) return
    const x = e.changedTouches[0].pageX
    useRectAll(`.${this.prefixCls}__star`, this._renderProxy).then((rects) => {
      if (rects.filter((n) => !n).length) return
      const first = rects[0]
      const maxWidth = rects.map((n) => n.width).reduce((a, b) => a + b, 0)
      const diff = x - first.left
      let value = Math.ceil(diff / first.width)
      if (diff > 0 && diff < maxWidth) {
        const index = value - 1
        if (this.allowHalf) {
          const star = rects[index]
          const has = x - star.left < star.width / 2
          value = has ? value - 0.5 : value
        }
        this.onChange(value, index)
      }
    })
  }

  mounted() {
    const inputValue = this.controlled ? this.value : this.defaultValue
    this.setValue(inputValue)
    this.onRecalc()
  }
}

export { Rater }

export default defineComponentHOC()(Rater)
