import type { ClassNames } from '@doraemon-ui/miniprogram.animation-group'
import type { CustomEvent } from '@doraemon-ui/miniprogram.core-js'
import { Component, defineComponentHOC, Doraemon, Emit, Event, Prop } from '@doraemon-ui/miniprogram.core-js'

import type { PromptButton, PromptClassItem } from './types'

const { classNames } = Doraemon.util

const defaultIcon =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAHdElNRQfgCxwAHyE2vHbUAAACWUlEQVRo3u2ZP2gTcRTHP7EpBTOJWrDSxdZBxE0yCC3UdilqUBCs4B8ogVfr0EnQ6lAEsylIXR6moFA1g6IoSAct7WhxUBQFsS5aLDgWcWitLjG5y11zufxyl8Hfd8n7vd+79z738svvfkfAysrqf1fC3609jHGYtnDJJBEuHiDpU7yNAkfj6sAmH990fOV9ADTN8fjK+3VA4izvB9AfL4B3EbY67E75Vn9qHeSCHAzfgQZJIU+f7moaAPvpAC7FAKAnPJ6EprkOQFbP6OZIAbSdgna5PEf4wSt6i8O7/NRx3RZdB84B4y7PGFsrYq7RExGAppgAhnV72ScDdDFVGi7ST4s8jqoD/77/UadTvkiW0wB8pltmZX3jBEYAmizd6YSmKiYfATAStLGadWDAYQ+5p+QXF4G5oBQGANrObccwr50VAXmG5HdQFs8RQpfoKA023Ip1N5c563E/5Qrvwj3NkqGiAU2Q5gYHfCczZPio55mvtuyMADTDHbZUDdnDLOhJKbiu+1O23Qe3sGsgFVC+HFejQgLIA1ro40OVkGUO0SpTtWYM/SuQdZljL/t44jM5T5od8lzWas8XehECCLznmO7kDc6HTLcshs9lsA/IEsOO4Wg95U13whmHPV1fCiMAWWWkaOZkpQkAwP3i52S9CQwBZIUccE+WmwQA3AKu1n+5MYB8JyufmggAte96EQGYyQJYAAtgASyA90y46rC/ahM68DLiigtBAFHfdC4AQBZ4GGH5tzwL6gCc8n3paIRe01v52trQ/wuqaI0X3JQZ80RWVlYN11+uNXxr6IunHwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNi0xMS0yOFQwMDozMTozMyswODowMBHRiXcAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTYtMTEtMjhUMDA6MzE6MzMrMDg6MDBgjDHLAAAAAElFTkSuQmCC'

@Component({
  props: {
    prefixCls: {
      type: String,
      default: 'dora-prompt',
    },
  },
})
class Prompt extends Doraemon {
  prefixCls!: string

  @Prop({
    type: null,
    default: 'dora-animate--fadeIn',
  })
  classNames: ClassNames

  @Prop({
    type: String,
    default: defaultIcon,
  })
  icon: string

  @Prop({
    type: String,
    default: '',
  })
  title: string

  @Prop({
    type: String,
    default: '',
  })
  text: string

  @Prop({
    type: Array,
    default: [],
  })
  buttons: PromptButton[]

  @Prop({
    type: Boolean,
    default: false,
  })
  visible: boolean

  @Prop({
    type: [String, Object],
    default: '',
  })
  wrapStyle: string | Partial<CSSStyleDeclaration>

  get classes() {
    const { prefixCls, buttons } = this
    const wrap = classNames(prefixCls)
    const button = (buttons || []).map((buttonItem): PromptClassItem => {
      const itemWrap = classNames(`${prefixCls}__button`, {
        [`${prefixCls}__button--disabled`]: !!buttonItem.disabled,
        [`${buttonItem.className}`]: !!buttonItem.className,
      })
      const hover = buttonItem.hoverClass && buttonItem.hoverClass !== 'default' ? buttonItem.hoverClass : `${prefixCls}__button--hover`

      return {
        wrap: itemWrap,
        hover,
      }
    })

    return {
      wrap,
      button,
      bd: `${prefixCls}__bd`,
      icon: `${prefixCls}__icon`,
      title: `${prefixCls}__title`,
      text: `${prefixCls}__text`,
      buttons: `${prefixCls}__buttons`,
    }
  }

  onClick(e: CustomEvent<{ index: number }>) {
    const { index } = e.currentTarget.dataset
    const value = this.buttons[index]

    if (!value || value.disabled) return

    this.$emit('click', {
      index,
      value,
      buttons: this.buttons,
    })
  }

  @Event()
  @Emit('getuserinfo')
  onGetUserInfo(e: CustomEvent) {
    return { ...e.detail, ...e.currentTarget.dataset }
  }

  @Event()
  @Emit('contact')
  onContact(e: CustomEvent) {
    return { ...e.detail, ...e.currentTarget.dataset }
  }

  @Event()
  @Emit('getphonenumber')
  onGetPhoneNumber(e: CustomEvent) {
    return { ...e.detail, ...e.currentTarget.dataset }
  }

  @Event()
  @Emit('launchapp')
  onLaunchApp(e: CustomEvent) {
    return { ...e.detail, ...e.currentTarget.dataset }
  }

  @Event()
  @Emit('chooseavatar')
  onChooseAvatar(e: CustomEvent) {
    return { ...e.detail, ...e.currentTarget.dataset }
  }

  @Event()
  @Emit('opensetting')
  onOpenSetting(e: CustomEvent) {
    return { ...e.detail, ...e.currentTarget.dataset }
  }

  @Event()
  @Emit('createliveactivity')
  onCreateLiveActivity(e: CustomEvent) {
    return { ...e.detail, ...e.currentTarget.dataset }
  }

  @Event()
  @Emit('getrealtimephonenumber')
  onGetRealtimePhoneNumber(e: CustomEvent) {
    return { ...e.detail, ...e.currentTarget.dataset }
  }

  @Event()
  @Emit('agreeprivacyauthorization')
  onAgreePrivacyAuthorization(e: CustomEvent) {
    return { ...e.detail, ...e.currentTarget.dataset }
  }

  @Event()
  @Emit('error')
  onError(e: CustomEvent) {
    return { ...e.detail, ...e.currentTarget.dataset }
  }
}

export { defaultIcon, Prompt }

export default defineComponentHOC()(Prompt)
