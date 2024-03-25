import {
  getCurrentPage,
  findComponentNode,
  usePopupStateHOC,
  isObject,
  isString,
  isTrue,
  isFalse,
  type MiniprogramPublicInstance,
} from '@doraemon-ui/miniprogram.shared'
import type { ToastInstance } from '.'

/**
 * 预设的图标的类型
 *
 * @export
 */
export type ToastPresetIcon = 'success' | 'error' | 'warning' | 'loading'

/**
 * 图标的类型
 *
 * @export
 */
export type ToastIcon = ToastPresetIcon | string

/**
 * 显示位置的类型
 *
 * @export
 */
export type ToastPosition = 'top' | 'bottom' | 'center'

/**
 * 轻提示对应参数的类型
 *
 * @export
 * @interface ToastProps
 */
export interface ToastProps {
  /** 自定义类名前缀 */
  prefixCls?: string
  /** 自定义图片，image 的优先级高于 icon */
  image?: string
  /** 图标，可选值为 success、error、warning、loading */
  icon?: ToastIcon
  /** 图标的颜色 */
  iconColor?: string
  /** 提示文本 */
  text?: string
  /** 垂直方向显示位置，可选值为 top、bottom、center */
  position?: ToastPosition
  /** 是否显示蒙层 */
  mask?: boolean
  /** 是否允许背景点击 */
  maskClickable?: boolean
  /** 是否可见 */
  visible?: boolean
  /** 设置蒙层的 z-index */
  zIndex?: number
}

/**
 * 预设的图标
 *
 * @export
 */
export const presetIconRecord: {
  [T in ToastPresetIcon]: string
} = {
  success: 'checkmark-circle-outline',
  error: 'close-circle-outline',
  warning: 'alert',
  loading: 'loading-outline',
}

/**
 * show 方法对应参数的类型
 *
 * @export
 */
export type ToastShowProps = Omit<
  ToastProps,
  'visible'
> & {
  /** 提示的延迟时间，若小于等于 0 则不会自动关闭 */
  duration?: number
  /** 点击关闭按钮或蒙层的回调函数 */
  onClose?: () => void
  /** 关闭后的回调函数 */
  onClosed?: () => void
}

/**
 * 轻提示的参数
 *
 * @export
 */
export type ToastShowOptions = {
  /** 组件的选择器 */
  selector?: string,
  /** 页面的实例 */
  instance?: MiniprogramPublicInstance
}

/**
 * 默认属性
 */
const defaultProps: ToastShowProps = {
  duration: 1500,
}

const mergeProps = <T extends ToastShowProps>(p: Partial<T> | string): T => {
  return Object.assign({}, defaultProps, typeof p === 'string' ? { text: p } : p) as T
}

const mergeOptions = <T extends ToastShowOptions>(selector?: Partial<T> | string, instance?: MiniprogramPublicInstance): T => {
  let opts = {
    selector: '#dora-toast',
    instance: getCurrentPage(),
  } as T
  if (isString(selector)) {
    opts.selector = selector as string
    if (instance) {
      opts.instance = instance
    }
  } else if (isObject(selector)) {
    opts = {
      ...opts,
      ...selector as ToastShowOptions,
    }
  }
  return opts
}

const destroyFns = new Map<Function, boolean>()

function clear() {
  for (const [close] of destroyFns) {
    close()
    destroyFns.delete(close)
  }
}

function mountComponent(
  props: ToastShowProps,
  container: ToastInstance,
  statePropName: string = 'visible'
) {
  const { render, destroy, update } = usePopupStateHOC<ToastInstance>(statePropName)(container)
  const close = () => {
    if (isTrue(container[statePropName])) {
      destroy(props.onClose)
      if (destroyFns.has(close)) {
        destroyFns.delete(close)
      }
    }
  }

  // always clear destroyFns
  clear()
  destroyFns.set(close, true)

  if (isFalse(container[statePropName])) {
    render(props)
  }

  // rewrite close
  container.onClose = () => {
    close()
  }
  container.onClosed = () => {
    props.onClosed?.()
  }

  return {
    destroy: close,
    update,
  }
}

let _toast = null

function show (p: ToastShowProps | string, options?: ToastShowOptions): () => void
function show (p: ToastShowProps | string, selector?: string, instance?: MiniprogramPublicInstance): () => void
function show (p: ToastShowProps | string, selector?: ToastShowOptions | string, instance?: MiniprogramPublicInstance): () => void  {
  const props = mergeProps<ToastShowProps>(p)
  const options = mergeOptions<ToastShowOptions>(selector, instance)
  const comp = findComponentNode<ToastInstance>(options.selector, options.instance)
  const { destroy } = mountComponent(props, comp)
  // set auto close
  if (_toast) {
    clearTimeout(_toast)
    _toast = null
  }
  if (props.duration > 0) {
    _toast = setTimeout(() => destroy(), props.duration)
  }
  return () => destroy()
}

/**
 * 指令式方法对应参数的类型
 *
 * @export
 */
export type ToastInternalProps = Omit<
  ToastShowProps,
  'image' | 'icon' | 'iconColor'
>

function success (p: ToastInternalProps | string, options?: ToastShowOptions): Promise<void>
function success (p: ToastInternalProps | string, selector?: string, instance?: MiniprogramPublicInstance): Promise<void>
function success (p: ToastInternalProps | string, selector?: ToastShowOptions | string, instance?: MiniprogramPublicInstance): Promise<void>  {
  const props = mergeProps<ToastInternalProps>(p)
  return new Promise<void>((resolve) => {
    show.call(null, {
      ...props,
      icon: 'success',
      onClose: () => {
        resolve()
      },
    } as ToastShowProps, selector, instance)
  })
}

function warning (p: ToastInternalProps | string, options?: ToastShowOptions): Promise<void>
function warning (p: ToastInternalProps | string, selector?: string, instance?: MiniprogramPublicInstance): Promise<void>
function warning (p: ToastInternalProps | string, selector?: ToastShowOptions | string, instance?: MiniprogramPublicInstance): Promise<void>  {
  const props = mergeProps<ToastInternalProps>(p)
  return new Promise<void>((resolve) => {
    show.call(null, {
      ...props,
      icon: 'warning',
      onClose: () => {
        resolve()
      },
    } as ToastShowProps, selector, instance)
  })
}

function error (p: ToastInternalProps | string, options?: ToastShowOptions): Promise<void>
function error (p: ToastInternalProps | string, selector?: string, instance?: MiniprogramPublicInstance): Promise<void>
function error (p: ToastInternalProps | string, selector?: ToastShowOptions | string, instance?: MiniprogramPublicInstance): Promise<void>  {
  const props = mergeProps<ToastInternalProps>(p)
  return new Promise<void>((resolve) => {
    show.call(null, {
      ...props,
      icon: 'error',
      onClose: () => {
        resolve()
      },
    } as ToastShowProps, selector, instance)
  })
}

function info (p: ToastInternalProps | string, options?: ToastShowOptions): Promise<void>
function info (p: ToastInternalProps | string, selector?: string, instance?: MiniprogramPublicInstance): Promise<void>
function info (p: ToastInternalProps | string, selector?: ToastShowOptions | string, instance?: MiniprogramPublicInstance): Promise<void>  {
  const props = mergeProps<ToastInternalProps>(p)
  return new Promise<void>((resolve) => {
    show.call(null, {
      ...props,
      icon: undefined,
      onClose: () => {
        resolve()
      },
    } as ToastShowProps, selector, instance)
  })
}

function loading (p: ToastInternalProps | string, options?: ToastShowOptions): Promise<void>
function loading (p: ToastInternalProps | string, selector?: string, instance?: MiniprogramPublicInstance): Promise<void>
function loading (p: ToastInternalProps | string, selector?: ToastShowOptions | string, instance?: MiniprogramPublicInstance): Promise<void>  {
  const props = mergeProps<ToastInternalProps>(p)
  return new Promise<void>((resolve) => {
    show.call(null, {
      ...props,
      icon: 'loading',
      onClose: () => {
        resolve()
      },
    } as ToastShowProps, selector, instance)
  })
}

export {
  show,
  success,
  warning,
  error,
  info,
  loading,
  clear,
}
