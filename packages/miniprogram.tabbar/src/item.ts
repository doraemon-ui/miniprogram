import { defineComponentHOC, Doraemon, Component, Prop } from '@doraemon-ui/miniprogram.core-js'
import type { TabbarInstance } from './types'

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
  key: string

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
  color: string = 'positive'

  get classes() {
    const { prefixCls, disabled, current, color } = this
    return {
      wrap: classNames(prefixCls, {
        [`${prefixCls}--current`]: current,
        [`${prefixCls}--disabled`]: disabled,
        ['dora-color']: !!color,
        [`dora-color--${color}`]: !!color,
      }),
      icon: `${prefixCls}__icon`,
      title: `${prefixCls}__title`,
    }
  }

  changeCurrent(current: boolean, index: string, color: string, length: number) {
    this.width = `${100 / length}%`
    this.current = current
    this.color = color
    this.index = index
  }

  onTap() {
    const parent = this.$parent as TabbarInstance | undefined
    if (this.disabled || !parent) return
    this.$emit('click', { index: this.index })
    parent.setActiveKey(this.index)
  }
}

export { TabbarItem }

export default defineComponentHOC()(TabbarItem)
