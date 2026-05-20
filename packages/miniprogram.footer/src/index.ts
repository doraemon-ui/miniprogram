import { defineComponentHOC, Doraemon, Component, Prop } from '@doraemon-ui/miniprogram.core-js'
import type { CustomEvent } from '@doraemon-ui/miniprogram.core-js'
import { useNativeRoute } from '@doraemon-ui/miniprogram.shared'
import type { NativeRouteOpenType, PresetColor } from '@doraemon-ui/miniprogram.shared'
import type { FooterChipItem, FooterLinkItem } from './types'

const { classNames } = Doraemon.util

@Component({
  props: {
    prefixCls: {
      type: String,
      default: 'dora-footer',
    },
  },
})
class Footer extends Doraemon {
  prefixCls!: string

  @Prop({
    type: String,
    default: 'positive',
  })
  color: PresetColor

  @Prop({
    type: String,
    default: '',
  })
  label: string

  @Prop({
    type: String,
    default: '',
  })
  content: string

  @Prop({
    type: Array,
    default: () => [],
  })
  links: FooterLinkItem[]

  @Prop({
    type: Array,
    default: () => [],
  })
  chips: FooterChipItem[]

  get classes() {
    const { prefixCls, color } = this

    return {
      wrap: classNames(prefixCls, {
        'dora-color': color,
        [`dora-color--${color}`]: color,
      }),
      label: `${prefixCls}__label`,
      content: `${prefixCls}__content`,
      links: `${prefixCls}__links`,
      link: `${prefixCls}__link`,
      chips: `${prefixCls}__chips`,
      chip: `${prefixCls}__chip`,
      chipLink: `${prefixCls}__chip--link`,
    }
  }

  onLinkClick(e: CustomEvent<unknown, unknown, { index: number }>) {
    const { index } = e.currentTarget.dataset
    const item = this.links[index]

    if (!item) return

    if (item.url !== undefined) {
      useNativeRoute(
        {
          url: item.url,
          urlParams: item.urlParams,
          openType: item.openType as NativeRouteOpenType | undefined,
          delta: item.delta,
        },
        this,
      )
    }

    this.$emit('linkClick', {
      item,
      index,
    })
  }

  onChipClick(e: CustomEvent<unknown, unknown, { index: number }>) {
    const { index } = e.currentTarget.dataset
    const item = this.chips[index]

    if (!item || item.type !== 'link') return

    this.$emit('chipClick', {
      item,
      index,
    })
  }
}

export { Footer }

export default defineComponentHOC()(Footer)
