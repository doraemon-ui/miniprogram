import { Doraemon } from '@doraemon-ui/miniprogram.core-js'
import {
  getCurrentDOM,
  findComponentNode,
  isObject,
  isString,
  isTrue,
  MPInst,
} from '@doraemon-ui/miniprogram.shared'

/**
 * 图标的类型
 *
 * @export
 */
export type ToastIcon = 'success' | 'error' | 'warn'

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
  /** 图标，可选值为 success、error、warn */
  icon?: ToastIcon
  /** 图标的颜色 */
  iconColor?: string
  /** 提示文本 */
  text?: string
  /** 垂直方向显示位置，可选值为 top、bottom、center */
  position?: ToastPosition
  /** 是否显示蒙层 */
  mask?: boolean
  /*** 是否允许背景点击 */
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
export const ToastIconRecord: {
  [T in ToastIcon]: string
} = {
  success: 'checkmark-circle-outline',
  error: 'close-circle-outline',
  warn: 'alert',
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
  inst?: MPInst
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

const mergeOptions = <T extends ToastShowOptions>(selector?: Partial<T> | string, inst?: MPInst): T => {
  let opts = {
    selector: '#dora-toast',
    inst: getCurrentDOM(),
  } as T
  if (isString(selector)) {
    opts.selector = selector as string
    if (inst) {
      opts.inst = inst
    }
  } else if (isObject(selector)) {
    opts = {
      ...opts,
      ...selector as ToastShowOptions,
    }
  }
  return opts
}

/**
 * 缓存组件的实例对象
 */
const containers: Doraemon[] = []

/**
 * 卸载指定的组件
 *
 * @param {Doraemon} container 组件的实例对象
 * @param {() => void} [callback] 卸载后的回调函数
 */
function unmount (container: Doraemon, callback?: () => void) {
  const unmountResult = container._renderProxy
  if (unmountResult && isTrue(unmountResult.data.visible)) {
    unmountResult.setData({ visible: false }, () => {
      callback?.()
    })
  }
}

/**
 * 卸载所有的组件
 */
function clear () {
  while (containers.length > 0) {
    const container = containers.pop()
    if (!container) break
    unmount(container)
  }
}

let _toast = null

function show (p: ToastShowProps | string, options?: ToastShowOptions): () => void
function show (p: ToastShowProps | string, selector?: string, inst?: MPInst): () => void
function show (p: ToastShowProps | string, selector?: ToastShowOptions | string, inst?: MPInst): () => void  {
  const props = mergeProps<ToastShowProps>(p)
  const options = mergeOptions<ToastShowOptions>(selector, inst)
  const comp = findComponentNode<Doraemon>(options.selector, options.inst)
  const { onClose, onClosed, ...restProps } = props
  // always clear containers
  clear()
  containers.push(comp)
  comp._renderProxy.setData({ ...restProps, visible: true })
  ;(comp as any).onClose = function handleClose () {
    unmount(comp, onClose)
  }
  ;(comp as any).onPopupClosed = function handleClosed () {
    onClosed?.()
  }
  // set auto close
  if (_toast) {
    clearTimeout(_toast)
    _toast = null
  }
  if (props.duration > 0) {
    _toast = setTimeout(() => unmount(comp, onClose), props.duration)
  }
  return () => unmount(comp, onClose)
}

/**
 * 外部指令式方法对应参数的类型
 *
 * @export
 */
export type ToastExternalProps = Omit<
  ToastShowProps,
  'image' | 'icon' | 'iconColor'
>

function success (p: ToastExternalProps | string, options?: ToastShowOptions): Promise<void>
function success (p: ToastExternalProps | string, selector?: string, inst?: MPInst): Promise<void>
function success (p: ToastExternalProps | string, selector?: ToastShowOptions | string, inst?: MPInst): Promise<void>  {
  const props = mergeProps<ToastExternalProps>(p)
  return new Promise<void>((resolve) => {
    show.call(null, {
      ...props,
      icon: 'success',
      onClose: () => {
        resolve()
      },
    } as ToastShowProps, selector, inst)
  })
}

function warn (p: ToastExternalProps | string, options?: ToastShowOptions): Promise<void>
function warn (p: ToastExternalProps | string, selector?: string, inst?: MPInst): Promise<void>
function warn (p: ToastExternalProps | string, selector?: ToastShowOptions | string, inst?: MPInst): Promise<void>  {
  const props = mergeProps<ToastExternalProps>(p)
  return new Promise<void>((resolve) => {
    show.call(null, {
      ...props,
      icon: 'warn',
      onClose: () => {
        resolve()
      },
    } as ToastShowProps, selector, inst)
  })
}

function error (p: ToastExternalProps | string, options?: ToastShowOptions): Promise<void>
function error (p: ToastExternalProps | string, selector?: string, inst?: MPInst): Promise<void>
function error (p: ToastExternalProps | string, selector?: ToastShowOptions | string, inst?: MPInst): Promise<void>  {
  const props = mergeProps<ToastExternalProps>(p)
  return new Promise<void>((resolve) => {
    show.call(null, {
      ...props,
      icon: 'error',
      onClose: () => {
        resolve()
      },
    } as ToastShowProps, selector, inst)
  })
}

function info (p: ToastExternalProps | string, options?: ToastShowOptions): Promise<void>
function info (p: ToastExternalProps | string, selector?: string, inst?: MPInst): Promise<void>
function info (p: ToastExternalProps | string, selector?: ToastShowOptions | string, inst?: MPInst): Promise<void>  {
  const props = mergeProps<ToastExternalProps>(p)
  return new Promise<void>((resolve) => {
    show.call(null, {
      ...props,
      icon: undefined,
      onClose: () => {
        resolve()
      },
    } as ToastShowProps, selector, inst)
  })
}

export {
  show,
  success,
  warn,
  error,
  info,
  clear,
}
