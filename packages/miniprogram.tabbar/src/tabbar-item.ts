import { defineComponentHOC, Doraemon, Component, Prop } from '@doraemon-ui/miniprogram.core-js'

const { classNames } = Doraemon.util

@Component({
  components: {
    Tabbar: () => ({
      module: './index',
      type: 'parent',
    }),
  },
  props: {
    prefixCls: {
      type: String,
      default: 'dora-tabbar-item',
    },
  },
})
class TabbarItem extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof TabbarItem
   */
  prefixCls!: string

  /**
   * 唯一标识
   *
   * @type {string}
   * @memberof TabbarItem
   */
  @Prop({
    type: String,
    default: '',
  })
  tabKey: string

  /**
   * 标题
   *
   * @type {string}
   * @memberof TabbarItem
   */
  @Prop({
    type: String,
    default: '',
  })
  title: string

  /**
   * 是否禁用
   *
   * @type {boolean}
   * @memberof TabbarItem
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  disabled: boolean

  width: string = '100%'
  current: boolean = false
  index: string = '0'
  theme: string = 'balanced'

  get classes() {
    const p = this.prefixCls
    return {
      wrap: classNames(p, {
        [`${p}--${this.theme}`]: !!this.theme,
        [`${p}--current`]: this.current,
        [`${p}--disabled`]: this.disabled,
      }),
      icon: `${p}__icon`,
      title: `${p}__title`,
    }
  }

  changeCurrent(current: boolean, index: string, theme: string, length: number) {
    this.width = `${100 / length}%`
    this.current = current
    this.theme = theme
    this.index = index
  }

  onTap() {
    const proxy = this._renderProxy as any
    const parentNodes = proxy && typeof proxy.getRelationNodes === 'function' ? proxy.getRelationNodes('./index') : []
    const parentNode = parentNodes && parentNodes[0]
    const parent = parentNode && parentNode.$component
    if (this.disabled || !parent) return
    this.$emit('click', { index: this.index })
    if (parent && typeof parent.setActiveKey === 'function') {
      parent.setActiveKey(this.index)
    }
  }
}

export { TabbarItem }

export default defineComponentHOC()(TabbarItem)
