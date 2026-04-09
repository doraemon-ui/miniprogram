import { getCurrentPage, findComponentNode, usePopupStateHOC, isObject, isString, isTrue, isFalse } from '@doraemon-ui/miniprogram.shared'
import type { MiniprogramPublicInstance } from '@doraemon-ui/miniprogram.shared'
import type {
  ToastIcon,
  ToastInstance,
  ToastInternalProps,
  ToastPosition,
  ToastPresetIcon,
  ToastProps,
  ToastShowOptions,
  ToastShowProps,
} from './types'

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
 * 默认属性
 */
const defaultProps: ToastShowProps = {
  duration: 1500,
  position: 'center',
  maskClosable: true,
}

function config(val: Pick<ToastShowProps, 'duration' | 'position' | 'maskClosable'>) {
  if (val.duration !== undefined) {
    defaultProps.duration = val.duration
  }
  if (val.position !== undefined) {
    defaultProps.position = val.position
  }
  if (val.maskClosable !== undefined) {
    defaultProps.maskClosable = val.maskClosable
  }
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
      ...(selector as ToastShowOptions),
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

function mountComponent(props: ToastShowProps, container: ToastInstance, statePropName: string = 'visible') {
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

function show(p: ToastShowProps | string, options?: ToastShowOptions): () => void
function show(p: ToastShowProps | string, selector?: string, instance?: MiniprogramPublicInstance): () => void
function show(p: ToastShowProps | string, selector?: ToastShowOptions | string, instance?: MiniprogramPublicInstance): () => void {
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

function success(p: ToastInternalProps | string, options?: ToastShowOptions): Promise<void>
function success(p: ToastInternalProps | string, selector?: string, instance?: MiniprogramPublicInstance): Promise<void>
function success(
  p: ToastInternalProps | string,
  selector?: ToastShowOptions | string,
  instance?: MiniprogramPublicInstance,
): Promise<void> {
  const props = mergeProps<ToastInternalProps>(p)
  return new Promise<void>((resolve) => {
    show.call(
      null,
      {
        ...props,
        icon: 'success',
        onClose: () => {
          resolve()
        },
      } as ToastShowProps,
      selector,
      instance,
    )
  })
}

function warning(p: ToastInternalProps | string, options?: ToastShowOptions): Promise<void>
function warning(p: ToastInternalProps | string, selector?: string, instance?: MiniprogramPublicInstance): Promise<void>
function warning(
  p: ToastInternalProps | string,
  selector?: ToastShowOptions | string,
  instance?: MiniprogramPublicInstance,
): Promise<void> {
  const props = mergeProps<ToastInternalProps>(p)
  return new Promise<void>((resolve) => {
    show.call(
      null,
      {
        ...props,
        icon: 'warning',
        onClose: () => {
          resolve()
        },
      } as ToastShowProps,
      selector,
      instance,
    )
  })
}

function error(p: ToastInternalProps | string, options?: ToastShowOptions): Promise<void>
function error(p: ToastInternalProps | string, selector?: string, instance?: MiniprogramPublicInstance): Promise<void>
function error(p: ToastInternalProps | string, selector?: ToastShowOptions | string, instance?: MiniprogramPublicInstance): Promise<void> {
  const props = mergeProps<ToastInternalProps>(p)
  return new Promise<void>((resolve) => {
    show.call(
      null,
      {
        ...props,
        icon: 'error',
        onClose: () => {
          resolve()
        },
      } as ToastShowProps,
      selector,
      instance,
    )
  })
}

function info(p: ToastInternalProps | string, options?: ToastShowOptions): Promise<void>
function info(p: ToastInternalProps | string, selector?: string, instance?: MiniprogramPublicInstance): Promise<void>
function info(p: ToastInternalProps | string, selector?: ToastShowOptions | string, instance?: MiniprogramPublicInstance): Promise<void> {
  const props = mergeProps<ToastInternalProps>(p)
  return new Promise<void>((resolve) => {
    show.call(
      null,
      {
        ...props,
        icon: undefined,
        onClose: () => {
          resolve()
        },
      } as ToastShowProps,
      selector,
      instance,
    )
  })
}

function loading(p: ToastInternalProps | string, options?: ToastShowOptions): Promise<void>
function loading(p: ToastInternalProps | string, selector?: string, instance?: MiniprogramPublicInstance): Promise<void>
function loading(
  p: ToastInternalProps | string,
  selector?: ToastShowOptions | string,
  instance?: MiniprogramPublicInstance,
): Promise<void> {
  const props = mergeProps<ToastInternalProps>(p)
  return new Promise<void>((resolve) => {
    show.call(
      null,
      {
        ...props,
        icon: 'loading',
        onClose: () => {
          resolve()
        },
      } as ToastShowProps,
      selector,
      instance,
    )
  })
}

export { config, show, success, warning, error, info, loading, clear }
