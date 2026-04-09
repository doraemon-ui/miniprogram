import { getCurrentPage, findComponentNode, usePopupStateHOC, isObject, isString, isTrue, isFalse } from '@doraemon-ui/miniprogram.shared'
import type { MiniprogramPublicInstance } from '@doraemon-ui/miniprogram.shared'
import type {
  DialogAlertProps,
  DialogButton,
  DialogConfirmProps,
  DialogInstance,
  DialogProps,
  DialogShowOptions,
  DialogShowProps,
  NativeButtonEvent,
  NativeButtonHandle,
} from './types'

export type {
  DialogAlertProps,
  DialogButton,
  DialogConfirmProps,
  DialogProps,
  DialogShowOptions,
  DialogShowProps,
  NativeButtonEvent,
  NativeButtonHandle,
}

const mergeOptions = <T extends DialogShowOptions>(selector?: Partial<T> | string, instance?: MiniprogramPublicInstance): T => {
  let opts = {
    selector: '#dora-dialog',
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
      ...(selector as DialogShowOptions),
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

function mountComponent(props: DialogShowProps, container: DialogInstance, statePropName: string = 'visible') {
  const { render, destroy, update } = usePopupStateHOC<DialogInstance>(statePropName)(container)
  const close = () => {
    if (isTrue(container[statePropName])) {
      destroy(props.onClose)
      if (destroyFns.has(close)) {
        destroyFns.delete(close)
      }
    }
  }

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

function show(props?: DialogShowProps, options?: DialogShowOptions): () => void
function show(props?: DialogShowProps, selector?: string, instance?: MiniprogramPublicInstance): () => void
function show(props?: DialogShowProps, selector?: DialogShowOptions | string, instance?: MiniprogramPublicInstance): () => void {
  const options = mergeOptions<DialogShowOptions>(selector, instance)
  const comp = findComponentNode<DialogInstance>(options.selector, options.instance)
  const { destroy } = mountComponent(props, comp)

  return () => destroy()
}

function alert(props?: DialogAlertProps, options?: DialogShowOptions): Promise<void>
function alert(props?: DialogAlertProps, selector?: string, instance?: MiniprogramPublicInstance): Promise<void>
function alert(props?: DialogAlertProps, selector?: DialogShowOptions | string, instance?: MiniprogramPublicInstance): Promise<void> {
  const { confirmText, confirmType, onConfirm, ...restProps } = props
  return new Promise<void>((resolve) => {
    show.call(
      null,
      {
        ...restProps,
        buttonClosable: true,
        buttons: [
          {
            type: confirmType ?? 'balanced',
            text: confirmText ?? '确定',
            onClick(...args) {
              onConfirm?.(...args)
            },
          },
        ],
        onClose: () => {
          resolve()
        },
      } as DialogProps,
      selector,
      instance,
    )
  })
}

function confirm(props?: DialogConfirmProps, options?: DialogShowOptions): Promise<boolean>
function confirm(props?: DialogConfirmProps, selector?: string, instance?: MiniprogramPublicInstance): Promise<boolean>
function confirm(
  props?: DialogConfirmProps,
  selector?: DialogShowOptions | string,
  instance?: MiniprogramPublicInstance,
): Promise<boolean> {
  const { confirmText, confirmType, onConfirm, cancelText, cancelType, onCancel, ...restProps } = props
  return new Promise<boolean>((resolve) => {
    show.call(
      null,
      {
        ...restProps,
        buttonClosable: true,
        buttons: [
          {
            type: cancelType ?? 'dark',
            text: cancelText ?? '取消',
            async onClick(...args) {
              await onCancel?.(...args)
              resolve(false)
            },
          },
          {
            type: confirmType ?? 'balanced',
            text: confirmText ?? '确定',
            async onClick(...args) {
              await onConfirm?.(...args)
              resolve(true)
            },
          },
        ],
        onClose: () => {
          restProps.onClose?.()
          resolve(false)
        },
      } as DialogProps,
      selector,
      instance,
    )
  })
}

export { show, alert, confirm, clear }
