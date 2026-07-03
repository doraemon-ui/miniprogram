import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'
import { getFontSize } from '@doraemon-ui/miniprogram.shared'
import type { IconType, MpIconType } from './types'

const { classNames, styleToCssString } = Doraemon.util

export const PRESET_MP_ICON_MAP: Record<MpIconType, string> = {
  back: '#B2B2B2',
  cancel: '#F43530',
  circle: '#C9C9C9',
  clear: '#B2B2B2',
  delete: '#B2B2B2',
  download: '#09BB07',
  info: '#10AEFF',
  info_circle: '#09BB07',
  safe_success: '#09BB07',
  safe_warn: '#FFBE00',
  search: '#B2B2B2',
  success: '#09BB07',
  success_circle: '#09BB07',
  success_no_circle: '#09BB07',
  waiting: '#10AEFF',
  waiting_circle: '#10AEFF',
  warn: '#F76260',
}

@Component({
  props: {
    prefixCls: {
      type: String,
      default: 'doraicons',
    },
  },
})
class Icon extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof Icon
   */
  prefixCls!: string

  /**
   * 是否隐藏
   *
   * @type {boolean}
   * @memberof Icon
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  hidden: boolean

  /**
   * 图标类型
   *
   * @type {(IconType | MpIconType)}
   * @memberof Icon
   */
  @Prop({
    type: String,
    default: '',
  })
  type: IconType | MpIconType

  /**
   * 图标尺寸
   *
   * @type {(string | number)}
   * @memberof Icon
   */
  @Prop({
    type: [String, Number],
    default: 32,
  })
  size: string | number

  /**
   * 图标颜色
   *
   * @type {string}
   * @memberof Icon
   */
  @Prop({
    type: String,
    default: '',
  })
  color: string

  get classes() {
    const { prefixCls, type } = this
    const wrap = classNames(prefixCls, {
      [`${prefixCls}-${type}`]: type,
    })
    return {
      wrap,
    }
  }

  get containerStyle() {
    const { prefixCls, type, size, color } = this
    let iconColor: string = ''
    if (prefixCls === 'mpicons' && PRESET_MP_ICON_MAP[type as MpIconType]) {
      const presetColor = PRESET_MP_ICON_MAP[type as MpIconType]
      if (presetColor) {
        iconColor = presetColor
      }
    }
    if (color !== '') {
      iconColor = color
    }
    return styleToCssString({
      fontSize: getFontSize(size),
      color: iconColor !== '' ? iconColor : 'unset',
    })
  }

  onClick() {
    this.$emit('click')
  }
}

export { Icon }

export default defineComponentHOC()(Icon)
