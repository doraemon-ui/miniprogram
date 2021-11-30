import { Doraemon } from '@doraemon-ui/miniprogram.core-js'
import {
  getCurrentDOM,
  findComponentNode,
  NativeButtonProps,
  PresetColor,
  DefaultButtonHandle,
  NativeButtonHandle,
  MPInst,
} from '@doraemon-ui/miniprogram.shared'

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
export type DialogOpenOptions = {
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
export type DialogOpenProps = Omit<
  DialogProps,
  'visible'
> & {
  /** 点击关闭按钮或蒙层的回调函数 */
  onClose?: () => void
  /** 关闭后的回调函数 */
  onClosed?: () => void
}

function open (props?: DialogOpenProps, options?: DialogOpenOptions): () => void
function open (props?: DialogOpenProps, selector?: string, inst?: MPInst): () => void
function open (props?: DialogOpenProps, selector?: DialogOpenOptions | string, inst?: MPInst): () => void {
  let opts: DialogOpenOptions = {
    selector: '#dora-dialog',
    inst: getCurrentDOM(),
  }
  if (typeof selector === 'string') {
    opts.selector = selector as string
    if (inst) {
      opts.inst = inst
    }
  } else if (typeof selector === 'object') {
    opts = {
      ...opts,
      ...selector as DialogOpenOptions,
    }
  }
  const comp = findComponentNode<Doraemon>(opts.selector, opts.inst)
  const vm = comp._renderProxy
  const { onClose, onClosed, ...restProps } = props
  vm.setData({ ...restProps, visible: true })
  ;(comp as any).onClose = function handleClose () {
    if (!vm.data.visible) { return }
    vm.setData({ visible: false }, () => {
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
  DialogOpenProps,
  'buttonClosable' | 'buttons'
> & {
  /** 确定按钮的文字 */
  confirmText?: string
  /** 确定按钮的类型 */
  confirmType?: PresetColor
  /** 确定按钮的点击事件 */
  onConfirm?: DefaultButtonHandle<DialogButton>
}

function alert (props?: DialogAlertProps, options?: DialogOpenOptions): Promise<void>
function alert (props?: DialogAlertProps, selector?: string, inst?: MPInst): Promise<void>
function alert (props?: DialogAlertProps, selector?: DialogOpenOptions | string, inst?: MPInst): Promise<void> {
  const { confirmText, confirmType, onConfirm, ...restProps } = props
  return new Promise<void>((resolve) => {
    open.call(null, {
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

function confirm (props?: DialogConfirmProps, options?: DialogOpenOptions): Promise<boolean>
function confirm (props?: DialogConfirmProps, selector?: string, inst?: MPInst): Promise<boolean>
function confirm (props?: DialogConfirmProps, selector?: DialogOpenOptions | string, inst?: MPInst): Promise<boolean> {
  const { confirmText, confirmType, onConfirm, cancelText, cancelType, onCancel, ...restProps } = props
  return new Promise<boolean>((resolve) => {
    open.call(null, {
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
  open,
  alert,
  confirm,
}
