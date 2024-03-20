import { Doraemon } from '@doraemon-ui/miniprogram.core-js'
import {
  getCurrentPage,
  findComponentNode,
  type NativeButtonProps,
  type PresetColor,
  type DefaultButtonHandle,
  type NativeButtonHandle,
  type MPInst,
} from '@doraemon-ui/miniprogram.shared'

const { getCurrentInstance } = Doraemon.util

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
  inst?: MPInst
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

function show (props?: DialogShowProps, options?: DialogShowOptions): () => void
function show (props?: DialogShowProps, selector?: string, inst?: MPInst): () => void
function show (props?: DialogShowProps, selector?: DialogShowOptions | string, inst?: MPInst): () => void {
  let opts: DialogShowOptions = {
    selector: '#dora-dialog',
    inst: getCurrentPage(),
  }
  if (typeof selector === 'string') {
    opts.selector = selector as string
    if (inst) {
      opts.inst = inst
    }
  } else if (typeof selector === 'object') {
    opts = {
      ...opts,
      ...selector as DialogShowOptions,
    }
  }
  const comp = findComponentNode<Doraemon>(opts.selector, opts.inst)
  const instance = getCurrentInstance(comp)
  const { onClose, onClosed, ...restProps } = props
  instance.setData({ ...restProps, visible: true })
  ;(comp as any).onClose = function handleClose () {
    if (!instance.data.visible) { return }
    instance.setData({ visible: false }, () => {
      onClose?.()
    })
  }
  ;(comp as any).onPopupClosed = function handleClosed () {
    onClosed?.()
  }
  return (comp as any).onClose.bind(comp)
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
function alert (props?: DialogAlertProps, selector?: string, inst?: MPInst): Promise<void>
function alert (props?: DialogAlertProps, selector?: DialogShowOptions | string, inst?: MPInst): Promise<void> {
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
    } as DialogProps, selector, inst)
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
function confirm (props?: DialogConfirmProps, selector?: string, inst?: MPInst): Promise<boolean>
function confirm (props?: DialogConfirmProps, selector?: DialogShowOptions | string, inst?: MPInst): Promise<boolean> {
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
    } as DialogProps, selector, inst)
  })
}

export {
  show,
  alert,
  confirm,
}
