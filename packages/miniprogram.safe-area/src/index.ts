import { defineComponentHOC, Doraemon, Component, Prop } from '@doraemon-ui/miniprogram.core-js'
import { getSystemInfoSync, getMenuButtonBoundingClientRectSync } from '@doraemon-ui/miniprogram.shared'

const { classNames, styleToCssString } = Doraemon.util

export type SafeAreaStyle = 'default' | 'navBar' | 'statusBar'

export function getSafeAreaInset(safeAreaStyle: SafeAreaStyle = 'default') {
  // StatusBar & NavBar
  const isDefault = ['default', 'navBar'].includes(safeAreaStyle)

  // iPhoneX 竖屏安全区域
  const safeAreaInset = {
    top: isDefault ? 88 : 44, // StatusBar & NavBar
    left: 0,
    right: 0,
    bottom: 34, // Home Indicator
  }

  try {
    const menuRect = getMenuButtonBoundingClientRectSync()
    const windowInfo = getSystemInfoSync(['window', 'device'])
    const { safeArea, screenHeight, windowHeight } = windowInfo
    const isIOS = !!(windowInfo.system.toLowerCase().search('ios') + 1)

    // 状态栏高度
    const statusBarHeight = !windowInfo.statusBarHeight
        ? screenHeight - windowHeight - 20
        : windowInfo.statusBarHeight

    // 胶囊高度
    const navBarHeight = (menuRect.top - statusBarHeight) * 2 + menuRect.height

    // 下方扩展 4 像素高度, 防止下方边距太小
    const navBarExtendHeight = windowInfo.statusBarHeight && isIOS ? 4 : 0
    
    safeAreaInset.top = isDefault
      ? statusBarHeight + navBarHeight + navBarExtendHeight
      : Math.max(statusBarHeight, safeAreaInset.top)

    safeAreaInset.bottom = screenHeight - safeArea.bottom
  } catch (e) {
    /** Ignore */
  }
  return safeAreaInset
}

export const checkIPhoneX = ({ model, windowHeight, windowWidth }) => {
  return /iphone (x|12|13|14)/.test(model.toLowerCase()) || (windowHeight >= 812 && windowHeight / windowWidth > 2)
}

export type SafeAreaConfig = {
  top: boolean
  bottom: boolean
}

export type SafeAreaProp = boolean | 'top' | 'bottom' | SafeAreaConfig

export const defaultSafeArea: SafeAreaConfig = {
  top: false,
  bottom: false,
}

export const getSafeAreaConfig = (params: SafeAreaProp): SafeAreaConfig => {
  if (typeof params === 'boolean') {
    return Object.assign({}, defaultSafeArea, {
      top: params,
      bottom: params,
    })
  } else if (params !== null && typeof params === 'object') {
    return Object.assign({}, defaultSafeArea, params)
  } else if (typeof params === 'string') {
    return Object.assign({}, defaultSafeArea, {
      [params]: true,
    })
  }
  return Object.assign({}, defaultSafeArea)
}

@Component({
  props: {
    prefixCls: {
      type: String,
      default: 'dora-safe-area',
    },
  },
})
class SafeArea extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof SafeArea
   */
  prefixCls!: string

  /**
   * 是否开启安全区适配
   *
   * @type {SafeAreaProp}
   * @memberof SafeArea
   */
  @Prop({
    type: [Boolean, String, Object],
    default: () => ({ ...defaultSafeArea }),
  })
  safeArea: SafeAreaProp

  /**
   * 安全区的范围，当其值为 default 或 navBar，顶部计算的安全区包含 StatusBar & NavBar
   *
   * @type {ESafeAreaStyle}
   * @memberof SafeArea
   */
  @Prop({
    type: String,
    default: 'default',
  })
  safeAreaStyle: SafeAreaStyle

  /**
   * 当其值为 false 时，组件内部会判断是否刘海屏，进而计算出安全区的距离
   *
   * @type {boolean}
   * @memberof SafeArea
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  forceRender: boolean

  /**
   * 使用 css 的 @supports 属性适配安全区
   *
   * @type {boolean}
   * @memberof SafeArea
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  supports: boolean

  /**
   * 自定义样式
   *
   * @type {Partial<CSSStyleDeclaration>}
   * @memberof SafeArea
   */
  @Prop({
    type: Object,
    default: null,
  })
  wrapStyle: Partial<CSSStyleDeclaration>

  /**
   * 组件样式
   *
   * @readonly
   * @memberof SafeArea
   */
  get containerStyle () {
    const { safeArea, safeAreaStyle, forceRender, supports, wrapStyle, isIPhoneX } = this
    const safeAreaConfig = getSafeAreaConfig(safeArea)
    const position = safeAreaConfig.bottom ? 'bottom' : safeAreaConfig.top ? 'top' : 'none'
    let varStyle = ''

    if (
      (forceRender || isIPhoneX) &&
      !supports &&
      ['bottom', 'top'].includes(position)
    ) {
      const safeAreaInset = getSafeAreaInset(safeAreaStyle)
      varStyle = `--inset-top: ${safeAreaInset.top}PX;`
      varStyle += `--inset-bottom: ${safeAreaInset.bottom}PX;`
    }

    return styleToCssString(
      varStyle + styleToCssString(wrapStyle)
    )
  }

  get classes () {
    const { prefixCls, forceRender, supports, safeArea, isIPhoneX } = this
    const safeAreaConfig = getSafeAreaConfig(safeArea)
    const wrap = classNames(prefixCls, {
      [`${prefixCls}--position-bottom`]: (forceRender || isIPhoneX) && safeAreaConfig.bottom,
      [`${prefixCls}--position-top`]: (forceRender || isIPhoneX) && !safeAreaConfig.bottom,
      [`${prefixCls}--supports`]: (forceRender || isIPhoneX) && supports,
    })

    return {
      wrap,
    }
  }

  /**
   * 内部判断是否刘海屏
   *
   * @readonly
   * @memberof SafeArea
   */
  get isIPhoneX() {
    const windowInfo = getSystemInfoSync(['window', 'device'])
    return checkIPhoneX(windowInfo)
  }
}

export default defineComponentHOC()(SafeArea)
