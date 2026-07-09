import { Component, defineComponentHOC, Doraemon, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'
import type { PresetColor } from '@doraemon-ui/miniprogram.shared'

import type { TabbarChangeDetail, TabbarItemInstance, TabbarKeyItem, TabbarPosition, TabbarSafeArea } from './types'
const { classNames, styleToCssString } = Doraemon.util

@Component({
  components: {
    TabbarItem: () => ({
      module: './item',
      type: 'child',
      observer: 'onChildrenChanged',
    }),
  },
  props: {
    prefixCls: {
      type: String,
      default: 'dora-tabbar',
    },
  },
})
class Tabbar extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof Tabbar
   */
  prefixCls!: string

  /**
   * 默认激活项
   *
   * @type {string}
   * @memberof Tabbar
   */
  @Prop({
    type: String,
    default: '',
  })
  defaultCurrent: string

  /**
   * 当前激活项
   *
   * @type {string}
   * @memberof Tabbar
   */
  @Prop({
    type: String,
    default: '',
  })
  current: string

  /**
   * 是否受控
   *
   * @type {boolean}
   * @memberof Tabbar
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  controlled: boolean

  /**
   * 颜色
   *
   * @type {PresetColor}
   * @memberof Tabbar
   */
  @Prop({
    type: String,
    default: 'positive',
  })
  color: PresetColor

  /**
   * 背景色
   *
   * @type {string}
   * @memberof Tabbar
   */
  @Prop({
    type: String,
    default: '#fff',
  })
  backgroundColor: string

  /**
   * 位置
   *
   * @type {TabbarPosition}
   * @memberof Tabbar
   */
  @Prop({
    type: String,
    default: '',
  })
  position: TabbarPosition

  /**
   * 安全区配置
   *
   * @type {TabbarSafeArea}
   * @memberof Tabbar
   */
  @Prop({
    type: [Boolean, String, Object],
    default: false,
  })
  safeArea: TabbarSafeArea

  tabbarStyle: string = ''
  activeKey: string = ''
  keys: TabbarKeyItem[] = []

  get classes() {
    const p = this.prefixCls
    return {
      wrap: classNames(p, {
        [`${p}--${this.position}`]: !!this.position,
        ['dora-color']: !!this.color,
        [`dora-color--${this.color}`]: !!this.color,
      }),
      tabbar: `${p}-wrap`,
    }
  }

  @Watch('current')
  onCurrentChange(v: string) {
    if (this.controlled) this.updated(v)
  }

  @Watch('backgroundColor')
  onBackgroundChange(v: string) {
    this.updateStyle(v)
  }

  onChildrenChanged() {
    this.changeCurrent(this.activeKey)
  }

  updated(activeKey: string = this.activeKey) {
    if (this.activeKey !== activeKey) this.activeKey = activeKey
    this.changeCurrent(activeKey)
  }

  changeCurrent(activeKey: string) {
    const elements = this.$children as TabbarItemInstance[]
    elements.forEach((element, index) => {
      const itemKey = element.key || String(index)
      const current = itemKey === activeKey
      if (element && typeof element.changeCurrent === 'function') {
        element.changeCurrent(current, itemKey, this.color, elements.length)
      }
    })
    if (this.keys.length !== elements.length) {
      this.keys = elements.map((element) => ({
        key: element.key,
        title: element.title,
        disabled: element.disabled,
      }))
    }
  }

  emitEvent(key: string) {
    this.$emit('change', { key, keys: this.keys } as TabbarChangeDetail)
  }

  setActiveKey(activeKey: string) {
    if (!this.controlled) this.updated(activeKey)
    this.emitEvent(activeKey)
  }

  updateStyle(backgroundColor: string) {
    const tabbarStyle = styleToCssString({ backgroundColor })
    if (this.tabbarStyle !== tabbarStyle) this.tabbarStyle = tabbarStyle
  }

  mounted() {
    const activeKey = this.controlled ? this.current : this.defaultCurrent
    this.updated(activeKey)
    this.updateStyle(this.backgroundColor)
  }
}

export { Tabbar }

export default defineComponentHOC()(Tabbar)
