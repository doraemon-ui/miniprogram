import type { MiniprogramPublicInstance } from '@doraemon-ui/miniprogram.shared'
import {
  customPromise,
  findComponentNode,
  getCurrentPage,
  isFalse,
  isObject,
  isString,
  isTrue,
  usePopupStateHOC,
} from '@doraemon-ui/miniprogram.shared'

import type {
  NotificationDestroyHandle,
  NotificationInstance,
  NotificationProps,
  NotificationShowOptions,
  NotificationShowProps,
} from './types'

export type { NotificationDestroyHandle, NotificationProps, NotificationShowOptions, NotificationShowProps }

const mergeOptions = <T extends NotificationShowOptions>(selector?: Partial<T> | string, instance?: MiniprogramPublicInstance): T => {
  let opts = {
    selector: '#dora-notification',
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
      ...(selector as NotificationShowOptions),
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

function mountComponent(props: NotificationShowProps, container: NotificationInstance, statePropName: string = 'visible') {
  const { render, destroy, update } = usePopupStateHOC<NotificationInstance>(statePropName)(container)
  const close = (() => {
    if (isTrue(container[statePropName])) {
      destroy(() => {
        props.onClose?.(props.data)
      })
      if (destroyFns.has(close)) {
        destroyFns.delete(close)
      }
    }
  }) as NotificationDestroyHandle

  const { promise: closePromise, resolve } = customPromise<void>()

  close.then = (onfulfilled?: () => void, onrejected?: (reason: unknown) => void) => closePromise.then(onfulfilled, onrejected)
  close.promise = closePromise

  destroyFns.set(close, true)

  if (isFalse(container[statePropName])) {
    render(props)
  }

  // rewrite close
  container.onClose = (data) => {
    close()
  }
  container.onClosed = () => {
    props.onClosed?.()
    resolve()
  }
  container.onClick = (data) => {
    props.onClick?.(data)
  }

  return {
    destroy: close as NotificationDestroyHandle,
    update,
  }
}

function show(props?: NotificationShowProps, options?: NotificationShowOptions): NotificationDestroyHandle
function show(props?: NotificationShowProps, selector?: string, instance?: MiniprogramPublicInstance): NotificationDestroyHandle
function show(
  props?: NotificationShowProps,
  selector?: NotificationShowOptions | string,
  instance?: MiniprogramPublicInstance,
): NotificationDestroyHandle {
  const options = mergeOptions<NotificationShowOptions>(selector, instance)
  const comp = findComponentNode<NotificationInstance>(options.selector, options.instance)
  const { destroy } = mountComponent(props, comp)

  return destroy
}

export { clear, show }
