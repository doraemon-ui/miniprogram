import { getCurrentPage, findComponentNode, usePopupStateHOC, isObject, isString, isTrue, isFalse } from '@doraemon-ui/miniprogram.shared'
import type { MiniprogramPublicInstance } from '@doraemon-ui/miniprogram.shared'
import type {
  ActionSheetButton,
  ActionSheetInstance,
  ActionSheetShowOptions,
  ActionSheetShowProps,
  NativeButtonEvent,
  NativeButtonHandle,
} from './types'

export type { ActionSheetButton, ActionSheetShowOptions, ActionSheetShowProps, NativeButtonEvent, NativeButtonHandle }

const mergeOptions = <T extends ActionSheetShowOptions>(selector?: Partial<T> | string, instance?: MiniprogramPublicInstance): T => {
  let opts = {
    selector: '#dora-action-sheet',
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
      ...(selector as ActionSheetShowOptions),
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

function mountComponent(props: ActionSheetShowProps, container: ActionSheetInstance, statePropName: string = 'visible') {
  const { render, destroy, update } = usePopupStateHOC<ActionSheetInstance>(statePropName)(container)
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

  container.onClose = () => {
    close()
  }
  container.onCancel = () => {
    props.onCancel?.()
    close()
  }
  container.onPopupClosed = () => {
    props.onClosed?.()
  }
  container.onDestructiveClick = () => {
    props.onDestructive?.()
    close()
  }

  return {
    destroy: close,
    update,
  }
}

function show(props?: ActionSheetShowProps, options?: ActionSheetShowOptions): () => void
function show(props?: ActionSheetShowProps, selector?: string, instance?: MiniprogramPublicInstance): () => void
function show(props?: ActionSheetShowProps, selector?: ActionSheetShowOptions | string, instance?: MiniprogramPublicInstance): () => void {
  const options = mergeOptions<ActionSheetShowOptions>(selector, instance)
  const comp = findComponentNode<ActionSheetInstance>(options.selector, options.instance)
  const { destroy } = mountComponent(props, comp)

  return () => destroy()
}

export { show, clear }
