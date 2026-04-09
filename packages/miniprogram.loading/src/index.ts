import { defineComponentHOC, Doraemon, Component } from '@doraemon-ui/miniprogram.core-js'
import type { LoadingShowOptions } from './types'

const { classNames } = Doraemon.util

const defaults: Required<LoadingShowOptions> = {
  prefixCls: 'dora-loading',
  classNames: 'dora-animate--fadeIn',
  text: '数据加载中',
  mask: true,
  transparent: true,
}

@Component({
  expose: ['show', 'hide'],
  props: {
    prefixCls: {
      type: String,
      default: 'dora-loading',
    },
  },
})
class Loading extends Doraemon {
  prefixCls!: string
  classNames: string = defaults.classNames
  text: string = defaults.text
  mask: boolean = defaults.mask
  transparent: boolean = defaults.transparent
  'in': boolean = false

  get classes() {
    const { prefixCls } = this
    return {
      wrap: classNames(prefixCls),
      content: classNames(`${prefixCls}__content`, {
        [`${prefixCls}__content--has-icon`]: true,
      }),
      icon: classNames(`${prefixCls}__icon`, {
        [`${prefixCls}__icon--loading`]: true,
      }),
      text: `${prefixCls}__text`,
    }
  }

  hide() {
    this['in'] = false
  }

  show(opts: LoadingShowOptions = {}) {
    const options = {
      ...defaults,
      ...opts,
    }
    this.prefixCls = options.prefixCls
    this.classNames = options.classNames
    this.text = options.text
    this.mask = options.mask
    this.transparent = options.transparent
    this['in'] = true
  }
}

export { Loading }

export const $wuxLoading = (
  selector = '#dora-loading',
  context?: WechatMiniprogram.Page.Instance<WechatMiniprogram.IAnyObject, WechatMiniprogram.IAnyObject>,
) => {
  const page =
    context ||
    (getCurrentPages()[getCurrentPages().length - 1] as WechatMiniprogram.Page.Instance<
      WechatMiniprogram.IAnyObject,
      WechatMiniprogram.IAnyObject
    >)
  return (page?.selectComponent?.(selector) || {}) as {
    show: (opts?: LoadingShowOptions) => void
    hide: () => void
  }
}

export default defineComponentHOC()(Loading)
