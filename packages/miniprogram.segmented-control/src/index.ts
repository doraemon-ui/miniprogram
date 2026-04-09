import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'
import type { CustomEvent } from '@doraemon-ui/miniprogram.core-js'
import type { SegmentedControlChangeDetail } from './types'
const { classNames } = Doraemon.util

@Component({
  props: {
    prefixCls: {
      type: String,
      default: 'dora-segmented-control',
    },
  },
})
class SegmentedControl extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof SegmentedControl
   */
  prefixCls!: string

  /**
   * 主题
   *
   * @type {string}
   * @memberof SegmentedControl
   */
  @Prop({
    type: String,
    default: 'balanced',
  })
  theme: string

  /**
   * 默认选中项
   *
   * @type {number}
   * @memberof SegmentedControl
   */
  @Prop({
    type: Number,
    default: 0,
  })
  defaultCurrent: number

  /**
   * 当前选中项
   *
   * @type {number}
   * @memberof SegmentedControl
   */
  @Prop({
    type: Number,
    default: 0,
  })
  current: number

  /**
   * 选项列表
   *
   * @type {string[]}
   * @memberof SegmentedControl
   */
  @Prop({
    type: Array,
    default: [],
  })
  values: string[]

  /**
   * 是否禁用
   *
   * @type {boolean}
   * @memberof SegmentedControl
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  disabled: boolean

  /**
   * 是否受控
   *
   * @type {boolean}
   * @memberof SegmentedControl
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  controlled: boolean

  activeKey: number = 0

  get classes() {
    const { prefixCls, theme, disabled } = this
    const wrap = classNames(prefixCls, {
      [`${prefixCls}--${theme}`]: !!theme,
      [`${prefixCls}--disabled`]: disabled,
    })
    return {
      wrap,
      item: `${prefixCls}__item`,
    }
  }

  @Watch('current')
  onCurrentChange(v: number) {
    if (this.controlled) this.activeKey = v
  }

  onTap(e: CustomEvent<{ index: number }>) {
    if (this.disabled) return
    this.setActiveKey(e.currentTarget.dataset.index)
  }

  emitEvent(key: number) {
    this.$emit('change', { key, values: this.values } as SegmentedControlChangeDetail)
  }

  setActiveKey(activeKey: number) {
    if (this.activeKey !== activeKey) {
      if (!this.controlled) this.activeKey = activeKey
    }
    this.emitEvent(activeKey)
  }

  mounted() {
    const activeKey = this.controlled ? this.current : this.defaultCurrent
    if (this.activeKey !== activeKey) this.activeKey = activeKey
  }
}

export { SegmentedControl }

export default defineComponentHOC()(SegmentedControl)
