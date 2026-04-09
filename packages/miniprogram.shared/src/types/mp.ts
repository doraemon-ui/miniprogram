/**
 * MiniprogramIAnyObject类型定义
 */
export type MiniprogramIAnyObject = WechatMiniprogram.IAnyObject

/**
 * MiniprogramPageInstance类型定义
 */
export type MiniprogramPageInstance = WechatMiniprogram.Page.Instance<MiniprogramIAnyObject, MiniprogramIAnyObject>

/**
 * MiniprogramComponentInstance类型定义
 */
export type MiniprogramComponentInstance = WechatMiniprogram.Component.Instance<
  MiniprogramIAnyObject,
  MiniprogramIAnyObject,
  MiniprogramIAnyObject,
  MiniprogramIAnyObject
>

/**
 * MiniprogramPublicInstance类型定义
 */
export type MiniprogramPublicInstance = MiniprogramPageInstance | MiniprogramComponentInstance

/**
 * MiniprogramElement类型定义
 */
export type MiniprogramElement = WechatMiniprogram.NodesRef

/**
 * MiniprogramCustomEvent类型定义
 */
export type MiniprogramCustomEvent<
  D extends MiniprogramIAnyObject = MiniprogramIAnyObject,
  M extends MiniprogramIAnyObject = MiniprogramIAnyObject,
  C extends MiniprogramIAnyObject = MiniprogramIAnyObject,
  T extends MiniprogramIAnyObject = C,
> = WechatMiniprogram.CustomEvent<D, M, C, T>

/**
 * MiniprogramButtonGetUserInfo类型定义
 */
export type MiniprogramButtonGetUserInfo = WechatMiniprogram.ButtonGetUserInfo['detail']
/**
 * MiniprogramButtonContact类型定义
 */
export type MiniprogramButtonContact = WechatMiniprogram.ButtonContact['detail']
/**
 * MiniprogramButtonGetPhoneNumber类型定义
 */
export type MiniprogramButtonGetPhoneNumber = WechatMiniprogram.ButtonGetPhoneNumber['detail']
/**
 * MiniprogramButtonError类型定义
 */
export type MiniprogramButtonError = WechatMiniprogram.ButtonError['detail']
/**
 * MiniprogramButtonOpenSetting类型定义
 */
export type MiniprogramButtonOpenSetting = WechatMiniprogram.ButtonOpenSetting['detail']
/**
 * MiniprogramButtonLaunchApp类型定义
 */
export type MiniprogramButtonLaunchApp = WechatMiniprogram.ButtonLaunchApp['detail']
/**
 * MiniprogramButtonChooseAvatar类型定义
 */
export type MiniprogramButtonChooseAvatar = WechatMiniprogram.CustomEvent['detail']

/**
 * 矩形对象的类型
 *
 * @export
 * @interface MiniprogramDOMRect
 */
export interface MiniprogramDOMRect {
  /**
   * 节点的宽度
   */
  width: number

  /**
   * 节点的高度
   */
  height: number

  /**
   * 节点的上边界坐标
   */
  top: number

  /**
   * 节点的右边界坐标
   */
  right: number

  /**
   * 节点的下边界坐标
   */
  bottom: number

  /**
   * 节点的左边界坐标
   */
  left: number

  /**
   * 同 left
   */
  x: number

  /**
   * 同 top
   */
  y: number

  /**
   * 节点的 ID
   */
  id: string

  /**
   * 节点的 dataset
   */
  dataset: Record<string, any>
}
