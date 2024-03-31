export type MiniprogramIAnyObject = WechatMiniprogram.IAnyObject

export type MiniprogramPageInstance =  WechatMiniprogram.Page.Instance<
  MiniprogramIAnyObject,
  MiniprogramIAnyObject
>

export type MiniprogramComponentInstance = WechatMiniprogram.Component.Instance<
  MiniprogramIAnyObject,
  MiniprogramIAnyObject,
  MiniprogramIAnyObject,
  MiniprogramIAnyObject
>

export type MiniprogramPublicInstance = MiniprogramPageInstance | MiniprogramComponentInstance

export type MiniprogramElement = WechatMiniprogram.NodesRef

export type MiniprogramCustomEvent<
  D extends MiniprogramIAnyObject = MiniprogramIAnyObject,
  M extends MiniprogramIAnyObject = MiniprogramIAnyObject,
  C extends MiniprogramIAnyObject = MiniprogramIAnyObject,
  T extends MiniprogramIAnyObject = C
> = WechatMiniprogram.CustomEvent<
  D,
  M,
  C,
  T
>

export type MiniprogramButtonGetUserInfo = WechatMiniprogram.ButtonGetUserInfo['detail']
export type MiniprogramButtonContact = WechatMiniprogram.ButtonContact['detail']
export type MiniprogramButtonGetPhoneNumber = WechatMiniprogram.ButtonGetPhoneNumber['detail']
export type MiniprogramButtonError = WechatMiniprogram.ButtonError['detail']
export type MiniprogramButtonOpenSetting = WechatMiniprogram.ButtonOpenSetting['detail']
export type MiniprogramButtonLaunchApp = WechatMiniprogram.ButtonLaunchApp['detail']
export type MiniprogramButtonChooseAvatar = WechatMiniprogram.CustomEvent['detail']

/**
 * 矩形对象的类型
 *
 * @export
 * @interface MiniprogramDOMRect
 */
export interface MiniprogramDOMRect {
  /** 节点的宽度 */
  width: number
  /** 节点的高度 */
  height: number
  /** 节点的上边界坐标 */
  top: number
  /** 节点的右边界坐标 */
  right: number
  /** 节点的下边界坐标 */
  bottom: number
  /** 节点的左边界坐标 */
  left: number
  /** 同 left */
  x: number
  /** 同 top */
  y: number
  /** 节点的 ID */
  id: string
  /** 节点的 dataset */
  dataset: Record<string, any>
}
