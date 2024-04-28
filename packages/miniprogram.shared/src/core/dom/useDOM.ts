import { miniprogramThis } from './global'
import { pxToNumber } from '../util'
import { canUseMP } from './canUseMP'
import { getCurrentPage } from './getCurrentPage'
import type { MiniprogramDOMRect, MiniprogramElement, MiniprogramPublicInstance } from '../../types'

/**
 * 查询节点信息的对象
 *
 * @param {MiniprogramPublicInstance} [instance=getCurrentPage()] 小程序页面或组件的实例对象
 * @return {*} 
 */
function useQuery (instance: MiniprogramPublicInstance = getCurrentPage()): WechatMiniprogram.SelectorQuery {
  if (!canUseMP()) {
    return null
  }
  return !!instance ? miniprogramThis?.createSelectorQuery?.().in(instance) : miniprogramThis?.createSelectorQuery?.()
}

/**
 * 获取匹配指定选择器的第一个元素
 *
 * @see https://developers.weixin.qq.com/miniprogram/dev/api/wxml/SelectorQuery.select.html
 * @param {string} selector 在当前页面下选择第一个匹配选择器 selector 的节点
 * @param {MiniprogramPublicInstance} instance 小程序页面或组件的实例对象
 * @return {*}  {(MiniprogramElement | null)}
 */
function useSelector (selector: string, instance?: MiniprogramPublicInstance): MiniprogramElement | null {
  return canUseMP() ? useQuery(instance).select(selector) : null
}

/**
 * 获取匹配指定选择器的所有元素
 *
 * @see https://developers.weixin.qq.com/miniprogram/dev/api/wxml/SelectorQuery.selectAll.html
 * @param {string} selector 在当前页面下选择匹配选择器 selector 的所有节点。
 * @param {MiniprogramPublicInstance} instance 小程序页面或组件的实例对象
 * @return {*}  {(MiniprogramElement | null)}
 */
function useSelectorAll (selector: string, instance?: MiniprogramPublicInstance): MiniprogramElement | null {
  return canUseMP() ? useQuery(instance).selectAll(selector) : null
}

const makeFields = () => ({
  id: true,
  dataset: true,
  mark: true,
  rect: true,
  // size: true,
  scrollOffset: true,
  computedStyle: [
    'width',
    'height',
    'borderTopWidth',
    'borderRightWidth',
    'borderBottomWidth',
    'borderLeftWidth',
  ],
  node: true,
})

export type NodeRef = {
  borderRightWidth: number
  borderLeftWidth: number
  borderTopWidth: number
  borderBottomWidth: number
  width: number
  height: number
  id: string
  dataset: Record<string, any>
  mark: Record<string, any>
  top: number
  right: number
  bottom: number
  left: number
  scrollHeight: number
  scrollLeft: number
  scrollTop: number
  scrollWidth: number
  node: Record<string, any>
}

export interface MiniprogramScrollOffset {
  /** 节点的 ID */
  id: string
  /** 节点的 dataset */
  dataset: Record<string, any>
  scrollLeft: number
  scrollTop: number
}

export interface MiniprogramNodeRef extends MiniprogramDOMRect, MiniprogramScrollOffset {
  mark: Record<string, any>

  offsetWidth: number
  offsetHeight: number
  clientLeft: number
  clientTop: number
  clientWidth: number
  clientHeight: number

  scrollHeight: number
  // scrollLeft: number
  // scrollTop: number
  scrollWidth: number

  node: Record<string, any>
}

const makeNodeRef = (node: NodeRef): MiniprogramNodeRef => {
  const borderRightWidth = pxToNumber(node.borderRightWidth || 0)
  const borderLeftWidth = pxToNumber(node.borderLeftWidth || 0)
  const borderTopWidth = pxToNumber(node.borderTopWidth || 0)
  const borderBottomWidth = pxToNumber(node.borderBottomWidth || 0)
  const clientWidth = pxToNumber(node.width)
  const clientHeight = pxToNumber(node.height)
  const offsetWidth = clientWidth + borderRightWidth + borderLeftWidth
  const offsetHeight = clientHeight + borderTopWidth + borderBottomWidth

  return {
    id: node.id,
    dataset: node.dataset,
    mark: node.mark,

    top: node.top,
    right: node.right,
    bottom: node.bottom,
    left: node.left,
    width: offsetWidth,
    height: offsetHeight,
    x: node.left,
    y: node.top,

    offsetWidth,
    offsetHeight,
    clientLeft: borderLeftWidth,
    clientTop: borderTopWidth,
    clientWidth,
    clientHeight,

    scrollHeight: node.scrollHeight,
    scrollLeft: node.scrollLeft,
    scrollTop: node.scrollTop,
    scrollWidth: node.scrollWidth,

    node: node.node,
  }
}

function useRef(selector: string, instance?: MiniprogramPublicInstance): Promise<MiniprogramNodeRef>
function useRef(selector: string[], instance?: MiniprogramPublicInstance): Promise<MiniprogramNodeRef[]>

/**
 * 获取第一个节点的相关信息
 *
 * @see https://developers.weixin.qq.com/miniprogram/dev/api/wxml/NodesRef.fields.html
 * @param {(string | string[])} selector 在当前页面下选择第一个匹配选择器 selector 的节点。
 * @param {MiniprogramPublicInstance} [instance] 小程序页面或组件的实例对象
 * @return {*}  {(Promise<MiniprogramNodeRef | MiniprogramNodeRef[]>)}
 */
function useRef (selector: string | string[], instance?: MiniprogramPublicInstance): Promise<MiniprogramNodeRef | MiniprogramNodeRef[]> {
  return new Promise((resolve) => {
    const query = useQuery(instance)
    const isArray = Array.isArray(selector)
    const classList = isArray ? selector : [selector]
    if (query) {
      classList.forEach((s) => {
        query
          .select(s)
          .fields(makeFields())
      })
      query.exec((nodes) => {
        resolve(
          isArray
            ? nodes.map((node) => makeNodeRef(node))
            : makeNodeRef(nodes[0])
        )
      })
    }
  })
}

function useRefAll(selector: string, instance?: MiniprogramPublicInstance): Promise<MiniprogramNodeRef[]>
function useRefAll(selector: string[], instance?: MiniprogramPublicInstance): Promise<MiniprogramNodeRef[][]>

/**
 * 获取所有节点的相关信息
 *
 * @see https://developers.weixin.qq.com/miniprogram/dev/api/wxml/NodesRef.fields.html
 * @param {(string | string[])} selector 在当前页面下选择匹配选择器 selector 的所有节点。
 * @param {MiniprogramPublicInstance} [instance] 小程序页面或组件的实例对象
 * @return {*}  {(Promise<MiniprogramNodeRef[] | MiniprogramNodeRef[][]>)}
 */
function useRefAll (selector: string | string[], instance?: MiniprogramPublicInstance): Promise<MiniprogramNodeRef[] | MiniprogramNodeRef[][]> {
  return new Promise((resolve) => {
    const query = useQuery(instance)
    const isArray = Array.isArray(selector)
    const classList = isArray ? selector : [selector]
    if (query) {
      classList.forEach((s) => {
        query
          .selectAll(s)
          .fields(makeFields())
      })
      query.exec((nodesList) => {
        resolve(
          isArray
            ? nodesList.map((nodes) => nodes.map((node) => makeNodeRef(node)))
            : nodesList[0].map((node) => makeNodeRef(node))
        )
      })
    }
  })
}

function useRect(selector: string, instance?: MiniprogramPublicInstance): Promise<MiniprogramDOMRect>
function useRect(selector: string[], instance?: MiniprogramPublicInstance): Promise<MiniprogramDOMRect[]>

/**
 * 添加第一个节点的布局位置的查询请求
 *
 * @see https://developers.weixin.qq.com/miniprogram/dev/api/wxml/NodesRef.boundingClientRect.html
 * @param {(string | string[])} selector 在当前页面下选择第一个匹配选择器 selector 的节点。
 * @param {MiniprogramPublicInstance} [instance] 小程序页面或组件的实例对象
 * @return {*}  {(Promise<MiniprogramDOMRect | MiniprogramDOMRect[]>)}
 */
function useRect (selector: string | string[], instance?: MiniprogramPublicInstance): Promise<MiniprogramDOMRect | MiniprogramDOMRect[]> {
  return new Promise((resolve) => {
    const query = useQuery(instance)
    const isArray = Array.isArray(selector)
    const classList = isArray ? selector : [selector]
    if (query) {
      classList.forEach((s) => {
        query
          .select(s)
          .boundingClientRect()
      })
      query.exec((nodes) => {
        resolve(isArray ? nodes : nodes[0])
      })
    }
  })
}

function useRectAll(selector: string, instance?: MiniprogramPublicInstance): Promise<MiniprogramDOMRect[]>
function useRectAll(selector: string[], instance?: MiniprogramPublicInstance): Promise<MiniprogramDOMRect[][]>

/**
 * 添加所有节点的布局位置的查询请求
 *
 * @param {(string | string[])} selector 在当前页面下选择匹配选择器 selector 的所有节点。
 * @param {MiniprogramPublicInstance} [instance] 小程序页面或组件的实例对象
 * @return {*}  {(Promise<MiniprogramDOMRect[] | MiniprogramDOMRect[][]>)}
 */
function useRectAll (selector: string | string[], instance?: MiniprogramPublicInstance): Promise<MiniprogramDOMRect[] | MiniprogramDOMRect[][]> {
  return new Promise((resolve) => {
      const query = useQuery(instance)
    const isArray = Array.isArray(selector)
    const classList = isArray ? selector : [selector]
    if (query) {
      classList.forEach((s) => {
        query
          .selectAll(s)
          .boundingClientRect()
      })
      query.exec((nodesList) => {
        resolve(isArray ? nodesList : nodesList[0])
      })
    }
  })
}

/**
 * 添加节点的滚动位置查询请求。以像素为单位。节点必须是 scroll-view 或者 viewport，返回 NodesRef 对应的 SelectorQuery。
 *
 * @see https://developers.weixin.qq.com/miniprogram/dev/api/wxml/NodesRef.scrollOffset.html
 * @param {MiniprogramPublicInstance} [instance] 小程序页面或组件的实例对象
 * @return {*}  {Promise<MiniprogramScrollOffset>}
 */
function useScrollOffset (instance?: MiniprogramPublicInstance): Promise<MiniprogramScrollOffset> {
  return new Promise((resolve) => {
    const query = useQuery(instance)
    if (query) {
      query
        .selectViewport()
        .scrollOffset()
      query.exec(([node]) => {
        resolve(node)
      })
    }
  })
}

function useComputedStyle (selector: string, instance?: MiniprogramPublicInstance): Promise<{ [key in keyof Partial<CSSStyleDeclaration>]: any }>

/**
 * 指定样式名列表，返回节点对应样式名的当前值
 *
 * @see https://developers.weixin.qq.com/miniprogram/dev/api/wxml/NodesRef.fields.html
 * @param {string} selector 在当前页面下选择第一个匹配选择器 selector 的节点。
 * @param {...any[]} args
 * @return {*}  {Promise<{ [key in keyof Partial<CSSStyleDeclaration>]: any }>}
 */
function useComputedStyle (selector: string, ...args: any[]): Promise<{ [key in keyof Partial<CSSStyleDeclaration>]: any }> {
  const [ computedStyle, instance ] = args
  const opts: {
    computedStyle: (keyof Partial<CSSStyleDeclaration>)[]
    instance: MiniprogramPublicInstance
  } = {
    computedStyle,
    instance,
  }

  if (instance === undefined) {
    opts.computedStyle = ['width', 'height']
    opts.instance = computedStyle as unknown as MiniprogramPublicInstance
  }

  return new Promise((resolve) => {
    const query = useQuery(opts.instance)
    if (query) {
      query
        .select(selector)
        .fields({
          computedStyle: opts.computedStyle as unknown as string[],
        })
      query.exec(([node]) => {
        resolve(node)
      })
    }
  })
}

export {
  useQuery,
  useSelector,
  useSelectorAll,
  useRef,
  useRefAll,
  useRect,
  useRectAll,
  useScrollOffset,
  useComputedStyle,
}
