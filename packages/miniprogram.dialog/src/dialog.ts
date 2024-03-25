import {
  getCurrentPage,
  findComponentNode,
  usePopupStateHOC,
  isTrue,
  isFalse,
  type NativeButtonProps,
  type PresetColor,
  type DefaultButtonHandle,
  type NativeButtonHandle,
  type MiniprogramPublicInstance,
} from '@doraemon-ui/miniprogram.shared'
import type { DialogInstance } from '.'

export type { NativeButtonHandle }

/**
 * 操作按钮的类型
 *
 * @export
 * @interface DialogButton
 */
export type DialogButton = Omit<
  NativeButtonProps,
  'size' | 'type'| 'plain' | 'loading'
> & {
  /** 标题 */
  text?: string
  /** 按钮类型 */
  type?: PresetColor
  /** 是否文字加粗 */
  bold?: boolean
  /** 类名 */
  className?: string
} & NativeButtonHandle<DialogButton>

/**
 * 对话框对应参数的类型
 *
 * @export
 * @interface DialogProps
 */
export interface DialogProps {
  /** 自定义类名前缀 */
  prefixCls?: string
  /** 弹窗对应的自定义样式 */
  bodyStyle?: CSSStyleDeclaration
  /** 是否显示蒙层 */
  mask?: boolean
  /** 点击蒙层是否允许关闭 */
  maskClosable?: boolean
  /** 是否可见 */
  visible?: boolean
  /** 设置蒙层的 z-index */
  zIndex?: number
  /** 是否显示关闭按钮 */
  closable?: boolean
  /** 点击操作按钮后后是否关闭 */
  buttonClosable?: boolean
  /** 是否显示垂直按钮布局 */
  verticalButtons?: boolean
  /** 图片 */
  image?: string
  /** 标题 */
  title?: string
  /** 内容 */
  content?: string
  /** 操作按钮列表 */
  buttons?: DialogButton[]
}

/**
 * 对话框的参数
 *
 * @export
 */
export type DialogShowOptions = {
  /** 组件的选择器 */
  selector?: string,
  /** 页面的实例 */
  instance?: MiniprogramPublicInstance
}

/**
 * show 方法对应参数的类型
 *
 * @export
 */
export type DialogShowProps = Omit<
  DialogProps,
  'visible'
> & {
  /** 点击关闭按钮或蒙层的回调函数 */
  onClose?: () => void
  /** 关闭后的回调函数 */
  onClosed?: () => void
}

const destroyFns = new Map<Function, boolean>()

function clear() {
  for (const [close] of destroyFns) {
    close()
    destroyFns.delete(close)
  }
}

function mountComponent(
  props: DialogShowProps,
  container: DialogInstance,
  statePropName: string = 'visible'
) {
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

function show (props?: DialogShowProps, options?: DialogShowOptions): () => void
function show (props?: DialogShowProps, selector?: string, instance?: MiniprogramPublicInstance): () => void
function show (props?: DialogShowProps, selector?: DialogShowOptions | string, instance?: MiniprogramPublicInstance): () => void {
  let opts: DialogShowOptions = {
    selector: '#dora-dialog',
    instance: getCurrentPage(),
  }
  if (typeof selector === 'string') {
    opts.selector = selector as string
    if (instance) {
      opts.instance = instance
    }
  } else if (typeof selector === 'object') {
    opts = {
      ...opts,
      ...selector as DialogShowOptions,
    }
  }
  const comp = findComponentNode<DialogInstance>(opts.selector, opts.instance)
  const { destroy } = mountComponent(props, comp)
  
  return () => destroy()
}

/**
 * alert 方法对应参数的类型
 *
 * @export
 */
export type DialogAlertProps = Omit<
  DialogShowProps,
  'buttonClosable' | 'buttons'
> & {
  /** 确定按钮的文字 */
  confirmText?: string
  /** 确定按钮的类型 */
  confirmType?: PresetColor
  /** 确定按钮的点击事件 */
  onConfirm?: DefaultButtonHandle<DialogButton>
}

function alert (props?: DialogAlertProps, options?: DialogShowOptions): Promise<void>
function alert (props?: DialogAlertProps, selector?: string, instance?: MiniprogramPublicInstance): Promise<void>
function alert (props?: DialogAlertProps, selector?: DialogShowOptions | string, instance?: MiniprogramPublicInstance): Promise<void> {
  const { confirmText, confirmType, onConfirm, ...restProps } = props
  return new Promise<void>((resolve) => {
    show.call(null, {
      ...restProps,
      buttonClosable: true,
      buttons: [{
        type: confirmType ?? 'balanced',
        text: confirmText ?? '确定',
        onClick (...args) {
          onConfirm?.(...args)
        },
      }],
      onClose: () => {
        resolve()
      },
    } as DialogProps, selector, instance)
  })
}

/**
 * confirm 方法对应参数的类型
 *
 * @export
 */
export type DialogConfirmProps = DialogAlertProps & {
  /** 取消按钮的文字 */
  cancelText?: string
  /** 取消按钮的类型 */
  cancelType?: PresetColor
  /** 取消按钮的点击事件 */
  onCancel?: DefaultButtonHandle<DialogButton>
}

function confirm (props?: DialogConfirmProps, options?: DialogShowOptions): Promise<boolean>
function confirm (props?: DialogConfirmProps, selector?: string, instance?: MiniprogramPublicInstance): Promise<boolean>
function confirm (props?: DialogConfirmProps, selector?: DialogShowOptions | string, instance?: MiniprogramPublicInstance): Promise<boolean> {
  const { confirmText, confirmType, onConfirm, cancelText, cancelType, onCancel, ...restProps } = props
  return new Promise<boolean>((resolve) => {
    show.call(null, {
      ...restProps,
      buttonClosable: true,
      buttons: [{
        type: cancelType ?? 'dark',
        text: cancelText ?? '取消',
        async onClick (...args) {
          await onCancel?.(...args)
          resolve(false)
        },
      }, {
        type: confirmType ?? 'balanced',
        text: confirmText ?? '确定',
        async onClick (...args) {
          await onConfirm?.(...args)
          resolve(true)
        },
      }],
      onClose: () => {
        restProps.onClose?.()
        resolve(false)
      },
    } as DialogProps, selector, instance)
  })
}

export {
  show,
  alert,
  confirm,
  clear,
}
