import { defineComponentHOC, Doraemon, Component, Prop } from '@doraemon-ui/miniprogram.core-js'
import type { CustomEvent } from '@doraemon-ui/miniprogram.core-js'
import type { NavbarClickDetail, NavbarTheme } from './types'

const { classNames } = Doraemon.util

@Component({
  props: {
    prefixCls: {
      type: String,
      default: 'dora-navbar',
    },
  },
})
class Navbar extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof Navbar
   */
  prefixCls!: string

  /**
   * 主题
   *
   * @type {NavbarTheme}
   * @memberof Navbar
   */
  @Prop({
    type: String,
    default: 'light',
  })
  theme: NavbarTheme

  /**
   * 标题
   *
   * @type {string}
   * @memberof Navbar
   */
  @Prop({
    type: String,
    default: '',
  })
  title: string

  /**
   * 左侧文字
   *
   * @type {string}
   * @memberof Navbar
   */
  @Prop({
    type: String,
    default: '',
  })
  leftText: string

  /**
   * 右侧文字
   *
   * @type {string}
   * @memberof Navbar
   */
  @Prop({
    type: String,
    default: '',
  })
  rightText: string

  get classes() {
    const { prefixCls, theme } = this
    const wrap = classNames(prefixCls, {
      [`${prefixCls}--${theme}`]: theme,
    })

    return {
      wrap,
      left: `${prefixCls}__left`,
      text: `${prefixCls}__text`,
      title: `${prefixCls}__title`,
      right: `${prefixCls}__right`,
    }
  }

  onClick(e: CustomEvent<NavbarClickDetail>) {
    const { type } = e.currentTarget.dataset
    this.$emit('click', { type })
  }
}

export { Navbar }

export default defineComponentHOC()(Navbar)
