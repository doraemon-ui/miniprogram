import { defineComponentHOC, Doraemon, Component, Prop } from '@doraemon-ui/miniprogram.core-js'
import { defaults } from './utils'
import type { ToptipsShowProps } from './types'

const { classNames } = Doraemon.util

let _toptips: { hide: () => void; timeout?: ReturnType<typeof setTimeout> } | null = null

@Component({
  props: {
    prefixCls: {
      type: String,
      default: 'dora-toptips',
    },
  },
})
class Toptips extends Doraemon {
  prefixCls!: string

  @Prop({
    type: String,
    default: defaults.classNames,
  })
  classNames: string
  @Prop({
    type: String,
    default: defaults.icon,
  })
  icon: string
  @Prop({
    type: Boolean,
    default: defaults.hidden,
  })
  hidden: boolean
  @Prop({
    type: String,
    default: defaults.text,
  })
  text: string
  @Prop({
    type: Number,
    default: defaults.duration,
  })
  duration: number;

  in: boolean = false
  private removed: boolean = false
  private fns: Required<Pick<ToptipsShowProps, 'success'>> = { success: () => {} }

  get classes() {
    const ico = this.icon || 'cancel'
    const p = this.prefixCls
    const wrap = classNames(p)
    const content = classNames(`${p}__content`, {
      [`${p}__content--${ico}`]: !!ico,
    })

    return {
      wrap,
      content,
      icon: `${p}__icon`,
      text: `${p}__text`,
    }
  }

  hide() {
    if (this.removed) return false
    this.removed = true
    if (_toptips) {
      clearTimeout(_toptips.timeout)
      _toptips = null
    }
    this.in = false
    this.fns.success?.()
    return true
  }

  show(opts: ToptipsShowProps = {}) {
    const closePromise = new Promise<boolean>((resolve) => {
      const options = Object.assign({}, defaults, opts)
      const callback = () => {
        this.hide()
        resolve(true)
      }
      this.removed = false
      this.in = true
      this.classNames = options.classNames || defaults.classNames
      this.icon = options.icon || defaults.icon
      this.hidden = !!options.hidden
      this.text = options.text || ''
      this.duration = options.duration || defaults.duration
      this.fns = { success: options.success || (() => {}) }

      if (_toptips) {
        clearTimeout(_toptips.timeout)
        _toptips = null
      }
      _toptips = {
        hide: this.hide.bind(this),
      }
      _toptips.timeout = setTimeout(callback, this.duration)
    })

    const result: any = () => {
      if (_toptips) _toptips.hide.call(this)
    }
    result.then = (resolve: any, reject: any) => closePromise.then(resolve, reject)
    result.promise = closePromise
    return result
  }

  success(opts: ToptipsShowProps = {}) {
    return this.show({ ...opts, icon: 'success' })
  }

  info(opts: ToptipsShowProps = {}) {
    return this.show({ ...opts, icon: 'info' })
  }

  warn(opts: ToptipsShowProps = {}) {
    return this.show({ ...opts, icon: 'warn' })
  }

  error(opts: ToptipsShowProps = {}) {
    return this.show({ ...opts, icon: 'cancel' })
  }

  detached() {
    this.hide()
  }
}

export { Toptips }

export default defineComponentHOC()(Toptips)
