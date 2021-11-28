export type MPPageInst =  WechatMiniprogram.Page.Instance<
  WechatMiniprogram.IAnyObject,
  WechatMiniprogram.IAnyObject
>

export type MPComponentInst = WechatMiniprogram.Component.Instance<
  WechatMiniprogram.IAnyObject,
  WechatMiniprogram.IAnyObject,
  WechatMiniprogram.IAnyObject,
  WechatMiniprogram.IAnyObject
>

export type MPInst = MPPageInst | MPComponentInst

export type MPElement = WechatMiniprogram.NodesRef

/**
 * 矩形对象的类型
 *
 * @export
 * @interface MPDOMRect
 */
export interface MPDOMRect {
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
}
