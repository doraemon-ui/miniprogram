import {
  getCurrentPage,
  findComponentNode,
  usePopupStateHOC,
  isObject,
  isString,
  isTrue,
  isFalse,
  type NativeButtonProps,
  type NativeButtonEvent,
  type DefaultButtonHandle,
  type NativeButtonHandle,
  type MiniprogramPublicInstance,
} from '@doraemon-ui/miniprogram.shared'
import type { ActionSheetInstance } from '.'

export type { NativeButtonHandle, NativeButtonEvent }

/**
 * 操作按钮的类型
 *
 * @export
 * @interface ActionSheetButton
 */
export type ActionSheetButton = Omit<NativeButtonProps, 'size' | 'type' | 'plain' | 'loading'> & {
  /** 按钮文本 */
  text?: string
  /** 按钮图标 */
  icon?: string
  /** 类名 */
  className?: string
} & NativeButtonHandle<ActionSheetButton>

/**
 * 动作面板对应参数的类型
 *
 * @export
 * @interface ActionSheetProps
 */
export interface ActionSheetProps {
  /** 自定义类名前缀 */
  prefixCls?: string
  /** 主题风格 */
  theme?: 'ios' | 'wx'
  /** 标题文本 */
  titleText?: string
  /** 操作按钮列表 */
  buttons?: ActionSheetButton[]
  /** 取消按钮文本 */
  cancelText?: string
  /** 删除按钮文本 */
  destructiveText?: string
  /** 是否可见 */
  visible?: boolean
}

/**
 * 动作面板的选项
 *
 * @export
 */
export type ActionSheetShowOptions = {
  /** 组件的选择器 */
  selector?: string
  /** 页面的实例 */
  instance?: MiniprogramPublicInstance
}

/**
 * show 方法对应参数的类型
 *
 * @export
 */
export type ActionSheetShowProps = Omit<ActionSheetProps, 'visible'> & {
  /** 按钮点击的回调函数 */
  onAction?: (detail: { method: string; button: ActionSheetButton; index: number; detail?: any }) => void
  /** 取消按钮点击的回调函数 */
  onCancel?: () => void
  /** 删除按钮点击的回调函数 */
  onDestructive?: () => void
  /** 关闭的回调函数 */
  onClose?: () => void
  /** 关闭后的回调函数 */
  onClosed?: () => void
}

const mergeOptions = <T extends ActionSheetShowOptions>(selector?: Partial<T> | string, instance?: MiniprogramPublicInstance): T => {
  let opts = {
    selector: '#dora-actionsheet',
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
