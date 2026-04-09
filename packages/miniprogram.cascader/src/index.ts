import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'
import { findComponentNode } from '@doraemon-ui/miniprogram.shared'
import type { CascaderChangeDetail, CascaderFieldNames, CascaderOption, CascaderValue, CascaderViewPublicInstance } from './types'

const { classNames } = Doraemon.util

export function getDefaultFieldNames(): CascaderFieldNames {
  return {
    label: 'label',
    value: 'value',
    children: 'children',
    disabled: 'disabled',
  }
}

@Component({
  props: {
    prefixCls: {
      type: String,
      default: 'dora-cascader',
    },
    defaultValue: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Array,
      default: () => [],
    },
    controlled: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    cancelText: {
      type: String,
      default: '取消',
    },
    confirmText: {
      type: String,
      default: '确定',
    },
    options: {
      type: Array,
      default: () => [],
    },
    full: {
      type: Boolean,
      default: false,
    },
    height: {
      type: null,
      default: 'auto',
    },
    chooseTitle: {
      type: String,
      default: '请选择',
    },
    visible: {
      type: Boolean,
      default: false,
    },
    skipAnimation: {
      type: Boolean,
      default: false,
    },
    defaultFieldNames: {
      type: Object,
      default: () => getDefaultFieldNames(),
    },
  },
  expose: ['getValue', 'close'],
})
class Cascader extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof Cascader
   */
  prefixCls!: string

  /**
   * 默认值（非受控）
   *
   * @type {string[]}
   * @memberof Cascader
   */
  @Prop({
    type: Array,
    default: () => [],
  })
  defaultValue: CascaderValue

  /**
   * 当前值（受控）
   *
   * @type {string[]}
   * @memberof Cascader
   */
  @Prop({
    type: Array,
    default: () => [],
  })
  value: CascaderValue

  /**
   * 是否受控
   *
   * @type {boolean}
   * @memberof Cascader
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  controlled: boolean

  /**
   * 标题
   *
   * @type {string}
   * @memberof Cascader
   */
  @Prop({
    type: String,
    default: '',
  })
  title: string

  /**
   * 取消按钮文字
   *
   * @type {string}
   * @memberof Cascader
   */
  @Prop({
    type: String,
    default: '取消',
  })
  cancelText: string

  /**
   * 确定按钮文字
   *
   * @type {string}
   * @memberof Cascader
   */
  @Prop({
    type: String,
    default: '确定',
  })
  confirmText: string

  /**
   * 级联选项
   *
   * @type {CascaderOption[]}
   * @memberof Cascader
   */
  @Prop({
    type: Array,
    default: () => [],
  })
  options: CascaderOption[]

  /**
   * 是否占满宽度（双列布局变为单列）
   *
   * @type {boolean}
   * @memberof Cascader
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  full: boolean

  /**
   * 自定义高度
   *
   * @type {(string | number)}
   * @memberof Cascader
   */
  @Prop({
    type: null,
    default: 'auto',
  })
  height: string | number

  /**
   * 未选择时的占位文案
   *
   * @type {string}
   * @memberof Cascader
   */
  @Prop({
    type: String,
    default: '请选择',
  })
  chooseTitle: string

  /**
   * 是否显示
   *
   * @type {boolean}
   * @memberof Cascader
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  visible: boolean

  /**
   * 是否跳过动画
   *
   * @type {boolean}
   * @memberof Cascader
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  skipAnimation: boolean

  /**
   * 自定义字段名映射（透传给 `dora-cascader-view`）
   *
   * @type {Partial<CascaderFieldNames>}
   * @memberof Cascader
   */
  @Prop({
    type: Object,
    default: () => getDefaultFieldNames(),
  })
  defaultFieldNames: Partial<CascaderFieldNames>

  shouldRender: boolean = false
  innerValue: CascaderValue = []
  activeValue: CascaderValue = []

  cascaderView: CascaderViewPublicInstance | null = null

  get classes() {
    const { prefixCls } = this
    const wrap = classNames(prefixCls)
    const hd = `${prefixCls}__hd`
    const bd = `${prefixCls}__bd`
    const toolbar = `${prefixCls}__toolbar`
    const inner = `${prefixCls}__inner`
    const cancel = classNames(`${prefixCls}__button`, {
      [`${prefixCls}__button--cancel`]: true,
    })
    const confirm = classNames(`${prefixCls}__button`, {
      [`${prefixCls}__button--confirm`]: true,
    })
    const hover = `${prefixCls}__button--hover`
    const title = `${prefixCls}__title`

    return {
      wrap,
      hd,
      bd,
      toolbar,
      inner,
      cancel,
      confirm,
      hover,
      title,
    }
  }

  @Watch('value')
  onValueChange(newVal: CascaderValue) {
    if (this.controlled) {
      this.setActiveValue(newVal)
      this.setInnerValue(newVal)
    }
  }

  @Watch('visible')
  onVisibleChange(shouldRender: boolean) {
    if (shouldRender) {
      this.setShouldRender(true)
    }
  }

  setShouldRender(shouldRender: boolean) {
    if (this.shouldRender !== shouldRender) {
      this.shouldRender = shouldRender
    }
  }

  setActiveValue(activeValue: CascaderValue, forceTrigger: boolean = false) {
    if (this.activeValue !== activeValue || forceTrigger) {
      this.activeValue = activeValue
    }
  }

  setInnerValue(innerValue: CascaderValue) {
    if (this.innerValue !== innerValue) {
      this.innerValue = innerValue
    }
  }

  /**
   * 获取当前选择的值与选项信息
   */
  getValue(value: CascaderValue = this.activeValue): CascaderChangeDetail | null {
    this.cascaderView = this.cascaderView || findComponentNode<CascaderViewPublicInstance>('#dora-cascader-view', this._renderProxy)
    return this.cascaderView ? this.cascaderView.getValue(value) : null
  }

  /**
   * 切换面板的回调
   */
  onTabsChange(e: WechatMiniprogram.CustomEvent<{ index: number }>) {
    this.$emit('tabsChange', e.detail)
  }

  /**
   * 叶子节点加载的回调
   */
  onLoadOptions(e: WechatMiniprogram.CustomEvent<{ value: CascaderValue; options: CascaderOption[] }>) {
    this.$emit('load', e.detail)
  }

  /**
   * 选项改变时触发
   */
  onChange(e: WechatMiniprogram.CustomEvent<CascaderChangeDetail>) {
    const props = e.detail
    const innerValue = props?.value || []
    this.setInnerValue(innerValue)

    if (this.visible) {
      this.$emit('change', props)
    }
  }

  /**
   * 组件关闭时的回调函数
   */
  close() {
    this.$emit('close')
  }

  /**
   * 组件关闭时重置其内部数据
   */
  onClosed() {
    const innerValue = this.activeValue
    this.setInnerValue(innerValue)
    this.setShouldRender(false)
  }

  /**
   * 点击确定按钮时的回调函数
   */
  onConfirm() {
    const activeValue = this.innerValue

    if (!this.controlled) {
      this.setActiveValue(activeValue, true)
    }

    const values = this.getValue(activeValue)
    this.$emit('confirm', values ? { ...values } : { value: activeValue, options: [], done: true })
    this.close()
  }

  /**
   * 点击取消按钮时的回调函数
   */
  onCancel() {
    const values = this.getValue()
    this.$emit('cancel', values ? { ...values } : { value: this.activeValue, options: [], done: true })
    this.close()
  }

  /**
   * 阻止移动触摸
   */
  noop() {}

  mounted() {
    const activeValue = this.controlled ? this.value : this.defaultValue
    this.setActiveValue(activeValue)
    this.setInnerValue(activeValue)
    this.setShouldRender(this.visible)
  }
}

export { Cascader }

export default defineComponentHOC({ externalClasses: ['dora-scroll-view-class'] })(Cascader)
