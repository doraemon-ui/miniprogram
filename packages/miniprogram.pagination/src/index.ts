import { defineComponentHOC, Doraemon, Component, Prop, Watch, Emit } from '@doraemon-ui/miniprogram.core-js'
const { classNames } = Doraemon.util

@Component({
  props: {
    prefixCls: {
      type: String,
      default: 'dora-pagination',
    },
  },
})
class Pagination extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof Pagination
   */
  prefixCls!: string

  /**
   * 形态
   *
   * @type {('button' | 'number' | 'pointer')}
   * @memberof Pagination
   */
  @Prop({
    type: String,
    default: 'button',
  })
  mode: 'button' | 'number' | 'pointer'

  /**
   * 默认页号
   *
   * @type {number}
   * @memberof Pagination
   */
  @Prop({
    type: Number,
    default: 1,
  })
  defaultCurrent: number

  /**
   * 当前页号
   *
   * @type {number}
   * @memberof Pagination
   */
  @Prop({
    type: Number,
    default: 1,
  })
  current: number

  /**
   * 是否受控
   *
   * @type {boolean}
   * @memberof Pagination
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  controlled: boolean

  /**
   * 总页数
   *
   * @type {number}
   * @memberof Pagination
   */
  @Prop({
    type: Number,
    default: 0,
  })
  total: number

  /**
   * 是否隐藏数值
   *
   * @type {boolean}
   * @memberof Pagination
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  simple: boolean

  get classes() {
    const { prefixCls } = this
    const wrap = classNames(prefixCls)
    const prev = `${prefixCls}__prev`
    const button = `${prefixCls}__button`
    const number = `${prefixCls}__number`
    const active = `${prefixCls}__active`
    const pointer = `${prefixCls}__pointer`
    const dot = `${prefixCls}__dot`
    const next = `${prefixCls}__next`
    return {
      wrap,
      prev,
      button,
      number,
      active,
      pointer,
      dot,
      next,
    }
  }

  activeIndex: number = 1

  @Watch('current')
  watchCurrent(newVal: number) {
    if (this.controlled) {
      this.updated(newVal)
    }
  }

  updated(activeIndex: number) {
    if (this.activeIndex !== activeIndex) {
      this.activeIndex = activeIndex
    }
  }

  @Emit('change')
  onChange(current: number, type: 'prev' | 'next') {
    if (!this.controlled) {
      this.updated(current)
    }

    return {
      current,
      type,
    }
  }

  @Emit('prev')
  onPrev() {
    const current = this.activeIndex - 1
    this.onChange(current, 'prev')
    return {
      current,
    }
  }

  @Emit('next')
  onNext() {
    const current = this.activeIndex + 1
    this.onChange(current, 'next')
    return {
      current,
    }
  }

  mounted() {
    const { defaultCurrent, current, controlled } = this
    const activeIndex = controlled ? current : defaultCurrent

    this.updated(activeIndex)
  }
}

export default defineComponentHOC()(Pagination)
