import { defineComponentHOC, Doraemon, Component } from '@doraemon-ui/miniprogram.core-js'
import type { KeyboardShowOptions } from './types'

const { classNames } = Doraemon.util

const defaults: Required<Omit<KeyboardShowOptions, 'onClose'>> = {
  prefixCls: 'dora-keyboard',
  className: '',
  titleText: '安全键盘',
  cancelText: '取消',
  inputText: '输入数字密码',
  showCancel: true,
  disorder: false,
  password: true,
  maxlength: 6,
  closeOnReject: true,
  onChange() {},
  callback() {},
}

const upsetNums = (isRandom = false, origin: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]) => {
  const arr = [...origin]
  if (isRandom) {
    const floor = Math.floor
    const random = Math.random
    const len = arr.length
    let n = floor(len / 2) + 1
    while (n--) {
      const i = floor(random() * len)
      const j = floor(random() * len)
      if (i !== j) {
        const temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
      }
    }
  }
  const nums: number[][] = []
  for (let i = 0; i < 4; i++) {
    nums.push(arr.slice(i * 3, (i + 1) * 3))
  }
  return nums
}

@Component({
  expose: ['show', 'hide'],
  props: {
    prefixCls: {
      type: String,
      default: 'dora-keyboard',
    },
  },
})
class Keyboard extends Doraemon {
  prefixCls!: string
  className: string = ''
  titleText: string = defaults.titleText
  cancelText: string = defaults.cancelText
  inputText: string = defaults.inputText
  showCancel: boolean = defaults.showCancel
  disorder: boolean = defaults.disorder
  password: boolean = defaults.password
  maxlength: number = defaults.maxlength
  closeOnReject: boolean = defaults.closeOnReject
  value: string = ''
  keys: number[] = [1, 1, 1, 1, 1, 1]
  nums: number[][] = upsetNums(false)
  'in': boolean = false

  fns: Required<Pick<KeyboardShowOptions, 'onChange' | 'callback'>> & { onClose?: (value: string) => unknown } = {
    onChange: defaults.onChange,
    callback: defaults.callback,
    onClose: undefined,
  }

  get classes() {
    const { prefixCls, className } = this
    return {
      wrap: classNames(prefixCls, className),
      hd: `${prefixCls}__hd`,
      bd: `${prefixCls}__bd`,
      label: `${prefixCls}__label`,
      password: `${prefixCls}__password`,
      input: `${prefixCls}__input`,
      ft: `${prefixCls}__ft`,
      title: `${prefixCls}__title`,
      numbers: `${prefixCls}__numbers`,
      number: `${prefixCls}__number`,
      text: `${prefixCls}__text`,
      hover: `${prefixCls}__text--hover`,
    }
  }

  hide() {
    this['in'] = false
  }

  show(opts: KeyboardShowOptions = {}) {
    const nums = upsetNums(!!opts.disorder)
    const maxlength = (opts.maxlength ?? defaults.maxlength) <= 0 ? -1 : (opts.maxlength ?? defaults.maxlength)
    const keys = maxlength !== -1 ? [...new Array(maxlength)].map(() => 1) : []
    const options = {
      ...defaults,
      ...opts,
      nums,
      keys,
      value: '',
      maxlength,
    }
    this.prefixCls = options.prefixCls
    this.className = options.className
    this.titleText = options.titleText
    this.cancelText = options.cancelText
    this.inputText = options.inputText
    this.showCancel = options.showCancel
    this.disorder = options.disorder
    this.password = options.password
    this.maxlength = options.maxlength
    this.closeOnReject = options.closeOnReject
    this.nums = options.nums
    this.keys = options.keys
    this.value = options.value
    this.fns = {
      onChange: typeof opts.onChange === 'function' ? opts.onChange : defaults.onChange,
      callback: typeof opts.callback === 'function' ? opts.callback : defaults.callback,
      onClose: typeof opts.onClose === 'function' ? opts.onClose : undefined,
    }
    this['in'] = true
    return this.hide.bind(this)
  }

  increase(e: WechatMiniprogram.BaseEvent<{ value?: number | string }>) {
    const nextValue = String(e.currentTarget?.dataset?.value ?? '')
    if (this.value.length >= this.maxlength && this.maxlength !== -1) return
    this.updateValue(this.value + nextValue)
  }

  decrease() {
    if (this.value.length === 0) return
    this.updateValue(this.value.substr(0, this.value.length - 1))
  }

  updateValue(value = '') {
    this.value = value
    this.fns.onChange?.call(this, value)
    if (this.maxlength !== -1 && value.length === this.maxlength) {
      const preCloseCallback = this.fns.onClose || this.fns.callback
      const resolveFn = this.hide.bind(this)
      const rejectFn = this.closeOnReject ? resolveFn : () => {}
      if (typeof preCloseCallback === 'function') {
        const result = preCloseCallback.call(this, value)
        if (result && typeof (result as Promise<unknown>).then === 'function') {
          ;(result as Promise<unknown>).then(resolveFn, rejectFn)
        } else if (result && typeof result === 'object' && 'closePromise' in (result as Record<string, unknown>)) {
          const closePromise = (result as { closePromise?: Promise<unknown> }).closePromise
          closePromise?.then(resolveFn, rejectFn)
        } else if (result !== false) {
          resolveFn()
        }
      } else {
        resolveFn()
      }
    }
  }
}

export { Keyboard }

export const $wuxKeyBoard = (
  selector = '#dora-keyboard',
  context?: WechatMiniprogram.Page.Instance<WechatMiniprogram.IAnyObject, WechatMiniprogram.IAnyObject>,
) => {
  const page =
    context ||
    (getCurrentPages()[getCurrentPages().length - 1] as WechatMiniprogram.Page.Instance<
      WechatMiniprogram.IAnyObject,
      WechatMiniprogram.IAnyObject
    >)
  return (page?.selectComponent?.(selector) || {}) as {
    show: (opts?: KeyboardShowOptions) => () => void
    hide: () => void
  }
}

export default defineComponentHOC()(Keyboard)
