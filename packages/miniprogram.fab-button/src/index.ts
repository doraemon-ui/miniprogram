import { Doraemon, Component, Prop, Watch, defineComponentHOC } from '@doraemon-ui/miniprogram.core-js'
import { useRect } from '@doraemon-ui/miniprogram.shared'
import type { FabButtonClassItem as ButtonClassItem, FabButtonDirection, FabButtonOption, FabButtonPosition, FabButtonTheme } from './types'
const { classNames } = Doraemon.util

const defaultAction =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAHdElNRQfhBAQLCR5MtjrbAAAAjUlEQVRo3u3ZMRKAIAxEUbDirp4nXnctFFDHBtDQ/O1Nnk6aHUMgZCBKMkmmNAtgOmL9M+IQQGVM95zljy8DAAAAAAAAAAAAAACALsDZcppSx7Q+WdtUvA5xffUtrjeA8/qQ21S9gc15/3Nfzw0M5O0G2kM5BQAAAAAAAAAAAAAAQGk33q0qZ/p/Q/JFdmei9usomnwIAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTA0LTA0VDExOjA5OjMwKzA4OjAw1U4c3wAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0wNC0wNFQxMTowOTozMCswODowMKQTpGMAAAAASUVORK5CYII='

const setTransform = (translate = 0, scale = 1, delay = 300, isHorizontal = true) => {
  const duration = `transition-duration: ${delay}ms`
  const transform = `transform: scale(${scale}) translate3d(${isHorizontal ? translate : 0}px, ${isHorizontal ? 0 : translate}px, 0)`
  return `opacity: 1; ${duration}; ${transform}`
}

@Component({
  props: {
    prefixCls: {
      type: String,
      default: 'dora-fab-button',
    },
    hoverClass: {
      type: String,
      default: 'default',
    },
    theme: {
      type: String,
      default: 'balanced',
    },
    position: {
      type: String,
      default: 'bottomRight',
    },
    action: {
      type: String,
      default: defaultAction,
    },
    actionRotate: {
      type: Boolean,
      default: true,
    },
    hideShadow: {
      type: Boolean,
      default: false,
    },
    backdrop: {
      type: Boolean,
      default: false,
    },
    buttons: {
      type: Array,
      default: () => [],
    },
    direction: {
      type: String,
      default: 'horizontal',
    },
    spaceBetween: {
      type: Number,
      default: 10,
    },
    duration: {
      type: Number,
      default: 300,
    },
    scale: {
      type: Number,
      default: 0.9,
    },
    reverse: {
      type: Boolean,
      default: false,
    },
    sAngle: {
      type: Number,
      default: 0,
    },
    eAngle: {
      type: Number,
      default: 360,
    },
    defaultVisible: {
      type: Boolean,
      default: false,
    },
    visible: {
      type: Boolean,
      default: false,
    },
    controlled: {
      type: Boolean,
      default: false,
    },
  },
})
class FabButton extends Doraemon {
  prefixCls!: string

  @Prop({
    type: String,
    default: 'default',
  })
  hoverClass: string

  @Prop({
    type: String,
    default: 'balanced',
  })
  theme: FabButtonTheme

  @Prop({
    type: String,
    default: 'bottomRight',
  })
  position: FabButtonPosition

  @Prop({
    type: String,
    default: defaultAction,
  })
  action: string

  @Prop({
    type: Boolean,
    default: true,
  })
  actionRotate: boolean

  @Prop({
    type: Boolean,
    default: false,
  })
  hideShadow: boolean

  @Prop({
    type: Boolean,
    default: false,
  })
  backdrop: boolean

  @Prop({
    type: Array,
    default: () => [],
  })
  buttons: FabButtonOption[]

  @Prop({
    type: String,
    default: 'horizontal',
  })
  direction: FabButtonDirection

  @Prop({
    type: Number,
    default: 10,
  })
  spaceBetween: number

  @Prop({
    type: Number,
    default: 300,
  })
  duration: number

  @Prop({
    type: Number,
    default: 0.9,
  })
  scale: number

  @Prop({
    type: Boolean,
    default: false,
  })
  reverse: boolean

  @Prop({
    type: Number,
    default: 0,
  })
  sAngle: number

  @Prop({
    type: Number,
    default: 360,
  })
  eAngle: number

  @Prop({
    type: Boolean,
    default: false,
  })
  defaultVisible: boolean

  @Prop({
    type: Boolean,
    default: false,
  })
  visible: boolean

  @Prop({
    type: Boolean,
    default: false,
  })
  controlled: boolean

  buttonStyle: string[] = []
  buttonVisible: boolean = false

  get classes() {
    const { prefixCls, position, theme, direction, reverse, buttonVisible, hideShadow, actionRotate, buttons, hoverClass } = this
    const wrap = classNames(prefixCls, {
      [`${prefixCls}--${position}`]: position,
      [`${prefixCls}--${theme}`]: theme,
      [`${prefixCls}--${direction}`]: direction,
      [`${prefixCls}--reverse`]: reverse,
      [`${prefixCls}--opened`]: buttonVisible,
    })
    const action = classNames(`${prefixCls}__action`, {
      [`${prefixCls}__action--hide-shadow`]: hideShadow,
    })
    const text = classNames(`${prefixCls}__text`, {
      [`${prefixCls}__text--rotate`]: buttonVisible && actionRotate,
    })
    const button = (buttons || []).map<ButtonClassItem>((item) => {
      return {
        wrap: classNames(`${prefixCls}__button`, {
          [`${prefixCls}__button--hide-shadow`]: !!item.hideShadow,
          [`${prefixCls}__button--disabled`]: !!item.disabled,
          [String(item.className || '')]: !!item.className,
        }),
        hover: item.hoverClass && item.hoverClass !== 'default' ? item.hoverClass : `${prefixCls}__button--hover`,
      }
    })
    const hover = hoverClass && hoverClass !== 'default' ? hoverClass : `${prefixCls}--hover`

    return {
      wrap,
      action,
      text,
      button,
      icon: `${prefixCls}__icon`,
      label: `${prefixCls}__label`,
      backdrop: `${prefixCls}__backdrop`,
      hover,
    }
  }

  @Watch('visible')
  onVisibleChange(newVal: boolean) {
    if (this.controlled) {
      this.updated(newVal)
    }
  }

  @Watch('buttons')
  @Watch('direction')
  @Watch('spaceBetween')
  @Watch('scale')
  @Watch('reverse')
  @Watch('sAngle')
  @Watch('eAngle')
  forceUpdateButtonStyle() {
    this.updateButtonStyle(!this.buttonVisible)
  }

  updated(buttonVisible: boolean) {
    if (this.buttonVisible !== buttonVisible) {
      this.buttonVisible = buttonVisible
      this.updateButtonStyle(!buttonVisible)
    }
  }

  onChange(buttonVisible: boolean) {
    if (!this.controlled) {
      this.updated(buttonVisible)
    }
    this.$emit('change', { value: buttonVisible })
  }

  onToggle() {
    this.onChange(!this.buttonVisible)
  }

  onTap(e: WechatMiniprogram.BaseEvent<Record<string, unknown>>) {
    const index = typeof e?.currentTarget?.dataset?.index === 'number' ? e.currentTarget.dataset.index : -1
    const value = (e?.currentTarget?.dataset?.value || {}) as FabButtonOption
    const params = {
      index,
      value,
      buttons: this.buttons,
    }
    if (!value.disabled) {
      this.$emit('click', params)
      this.onChange(false)
    }
  }

  updateButtonStyle(isReset: boolean) {
    const { prefixCls, buttons, duration, direction, spaceBetween, scale } = this
    const buttonStyle: string[] = []
    const sign = this.reverse ? 1 : -1
    const isHorizontal = direction === 'horizontal'

    if (isReset) {
      buttons.forEach(() => {
        buttonStyle.push('opacity: 0; transform: translate3d(0, 0, 0)')
      })
      this.buttonStyle = buttonStyle
      return
    }

    void useRect(`.${prefixCls}__action`, this._renderProxy).then((rect) => {
      if (!rect || typeof rect.width !== 'number') {
        return
      }

      if (direction === 'horizontal' || direction === 'vertical') {
        buttons.forEach((_, index) => {
          const offset = sign * (rect.width + spaceBetween) * (index + 1)
          buttonStyle.push(setTransform(offset, scale, duration, isHorizontal))
        })
      } else {
        const radius = rect.width + spaceBetween
        buttons.forEach((_, index) => {
          buttonStyle.push(this.getCircleStyle(index, radius))
        })
      }

      this.buttonStyle = buttonStyle
    })
  }

  getCircleStyle(index: number, radius: number) {
    const { sAngle, eAngle, duration, scale } = this
    const length = this.buttons.length
    const { max, sin, cos, PI } = Math
    const startAngle = (sAngle * PI) / 180
    const endAngle = (eAngle * PI) / 180
    const points = endAngle % (2 * PI) === 0 ? length : max(1, length - 1)
    const currentAngle = startAngle + ((endAngle - startAngle) / points) * index
    const x = Number((sin(currentAngle) * radius).toFixed(6))
    const y = Number((cos(currentAngle) * radius).toFixed(6))
    const transform = `transform: scale(${scale}) translate3d(${x}px, ${y}px, 0)`
    return `opacity: 1; transition-duration: ${duration}ms; ${transform}`
  }

  emitOpenTypeEvent(name: string, e: WechatMiniprogram.BaseEvent<Record<string, unknown>>) {
    const eventLike = e as unknown as {
      detail?: Record<string, unknown>
      currentTarget?: {
        dataset?: Record<string, unknown>
      }
    }
    this.$emit(name, {
      ...(eventLike.detail || {}),
      ...(eventLike.currentTarget?.dataset || {}),
    })
  }

  bindgetuserinfo(e: WechatMiniprogram.BaseEvent<Record<string, unknown>>) {
    this.emitOpenTypeEvent('getuserinfo', e)
  }

  bindcontact(e: WechatMiniprogram.BaseEvent<Record<string, unknown>>) {
    this.emitOpenTypeEvent('contact', e)
  }

  bindgetphonenumber(e: WechatMiniprogram.BaseEvent<Record<string, unknown>>) {
    this.emitOpenTypeEvent('getphonenumber', e)
  }

  bindopensetting(e: WechatMiniprogram.BaseEvent<Record<string, unknown>>) {
    this.emitOpenTypeEvent('opensetting', e)
  }

  bindlaunchapp(e: WechatMiniprogram.BaseEvent<Record<string, unknown>>) {
    this.emitOpenTypeEvent('launchapp', e)
  }

  bindchooseavatar(e: WechatMiniprogram.BaseEvent<Record<string, unknown>>) {
    this.emitOpenTypeEvent('chooseavatar', e)
  }

  onError(e: WechatMiniprogram.BaseEvent<Record<string, unknown>>) {
    this.emitOpenTypeEvent('error', e)
  }

  mounted() {
    const buttonVisible = this.controlled ? this.visible : this.defaultVisible
    this.updated(buttonVisible)
  }
}

export { FabButton }

export default defineComponentHOC()(FabButton)
