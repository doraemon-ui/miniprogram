import { Doraemon } from '@doraemon-ui/miniprogram.core-js'

/**
 * 原生按钮组件的类型
 *
 * @interface NativeButtonProps
 */
interface NativeButtonProps {
  size?: 'default' | 'mini'
  type?: 'default' | 'primary' | 'warn'
  plain?: boolean
  disabled?: boolean
  loading?: boolean
  formType?: 'submit' | 'reset'
  openType?: 'contact' | 'share' | 'getPhoneNumber' | 'getUserInfo' | 'launchApp' | 'openSetting' | 'feedback'
  hoverClass?: string
  hoverStopPropagation?: boolean
  hoverStartTime?: number
  hoverStayTime?: number
  lang?: 'en' | 'zh_CN' | 'zh_TW'
  sessionFrom?: string
  sendMessageTitle?: string
  sendMessagePath?: string
  sendMessageImg?: string
  appParameter?: string
  showMessageCard?: boolean
}

type GlobalTheme = 'light' | 'stable' | 'positive' | 'calm' | 'balanced' | 'energized' | 'assertive' | 'royal' | 'dark'

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
  type?: GlobalTheme
  /** 是否文字加粗 */
  bold?: boolean
  /** 类名 */
  className?: string
} & DialogButtonHandle

/**
 * 默认事件类型
 *
 * @export
 */
export type DefaultHandle<Detail = Record<string, any>> = (
  button?: DialogButton,
  index?: number,
  detail?: Detail
) => void | Promise<void>

/**
 * 按钮事件的类型
 *
 * @export
 */
export type DialogButtonHandle = {
  /** 点击事件 */
  onClick?: DefaultHandle<WechatMiniprogram.CustomEvent>
  /** 获取用户信息回调 */
  onGetUserInfo?: DefaultHandle<WechatMiniprogram.ButtonGetUserInfo>
  /** 客服消息回调 */
  onContact?: DefaultHandle<WechatMiniprogram.ButtonContact>
  /** 获取用户手机号回调 */
  onGetPhoneNumber?: DefaultHandle<WechatMiniprogram.ButtonGetPhoneNumber>
  /** 打开 APP 成功的回调 */
  onLaunchApp?: DefaultHandle<WechatMiniprogram.ButtonLaunchApp>
  /** 当使用开放能力时，发生错误的回调 */
  onError?: DefaultHandle<WechatMiniprogram.ButtonError>
  /** 在打开授权设置页后回调 */
  onOpenSetting?: DefaultHandle<WechatMiniprogram.ButtonOpenSetting>
}

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
  inst?: DialogPageInst
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

/**
 * 页面的实例
 *
 * @export
 */
export type DialogPageInst = WechatMiniprogram.Page.Instance<
  WechatMiniprogram.IAnyObject,
  WechatMiniprogram.IAnyObject
>

function open (props?: DialogOpenProps, options?: DialogOpenOptions): () => void
function open (props?: DialogOpenProps, selector?: string, inst?: DialogPageInst): () => void
function open (props?: DialogOpenProps, selector?: DialogOpenOptions | string, inst?: DialogPageInst): () => void {
  let opts: DialogOpenOptions = {
    selector: '#dora-dialog',
    inst: getCurrentPages()[getCurrentPages().length - 1],
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
  const comp = opts.inst.selectComponent(opts.selector) as unknown as Doraemon
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
  confirmType?: GlobalTheme
  /** 确定按钮的点击事件 */
  onConfirm?: DefaultHandle
}

function alert (props?: DialogAlertProps, options?: DialogOpenOptions): Promise<void>
function alert (props?: DialogAlertProps, selector?: string, inst?: DialogPageInst): Promise<void>
function alert (props?: DialogAlertProps, selector?: DialogOpenOptions | string, inst?: DialogPageInst): Promise<void> {
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
  cancelType?: GlobalTheme
  /** 取消按钮的点击事件 */
  onCancel?: DefaultHandle
}

function confirm (props?: DialogConfirmProps, options?: DialogOpenOptions): Promise<boolean>
function confirm (props?: DialogConfirmProps, selector?: string, inst?: DialogPageInst): Promise<boolean>
function confirm (props?: DialogConfirmProps, selector?: DialogOpenOptions | string, inst?: DialogPageInst): Promise<boolean> {
  const { confirmText, confirmType, onConfirm, cancelText, cancelType, onCancel, ...restProps } = props
  return new Promise<boolean>((resolve) => {
    open.call(null, {
      ...restProps,
      buttonClosable: true,
      buttons: [{
        type: cancelType ?? 'xxxxxxx',
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
