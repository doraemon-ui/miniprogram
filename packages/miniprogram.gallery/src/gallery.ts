import { findComponentNode, getCurrentPage, isFalse, isObject, isString, isTrue, usePopupStateHOC } from '@doraemon-ui/miniprogram.shared'
import type { MiniprogramPublicInstance } from '@doraemon-ui/miniprogram.shared'

import type { GalleryInstance, GalleryProps, GalleryShowOptions, GalleryShowProps } from './types'

export type { GalleryProps, GalleryShowOptions, GalleryShowProps }

const mergeOptions = <T extends GalleryShowOptions>(selector?: Partial<T> | string, instance?: MiniprogramPublicInstance): T => {
  let opts = {
    selector: '#dora-gallery',
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
      ...(selector as GalleryShowOptions),
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

function mountComponent(props: GalleryShowProps, container: GalleryInstance, statePropName: string = 'visible') {
  const { render, destroy, update } = usePopupStateHOC<GalleryInstance>(statePropName)(container)
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
  container.onCancel = () => {
    props.onCancel?.()
  }
  container.onChange = (detail) => {
    props.onChange?.(detail)
  }
  container.onClick = (current, urls) => {
    return props.onClick?.(current, urls)
  }
  container.onDelete = (current, urls) => {
    return props.onDelete?.(current, urls)
  }

  return {
    destroy: close,
    update,
  }
}

function show(props?: GalleryShowProps, options?: GalleryShowOptions): () => void
function show(props?: GalleryShowProps, selector?: string, instance?: MiniprogramPublicInstance): () => void
function show(props?: GalleryShowProps, selector?: GalleryShowOptions | string, instance?: MiniprogramPublicInstance): () => void {
  const options = mergeOptions<GalleryShowOptions>(selector, instance)
  const comp = findComponentNode<GalleryInstance>(options.selector, options.instance)
  const { destroy } = mountComponent(props, comp)

  return () => destroy()
}

export { show, clear }
