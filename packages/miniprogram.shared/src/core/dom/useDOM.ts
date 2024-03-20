import { miniprogramThis } from './global'
import { pxToNumber } from '../util'
import { canUseMP } from './canUseMP'
import { getCurrentPage } from './getCurrentPage'
import { type MPElement, type MPInst } from '../../types'

export const useQuery = (dom: MPInst = getCurrentPage()) => {
  if (!canUseMP()) {
    return null
  }
  return !!dom ? miniprogramThis?.createSelectorQuery?.().in(dom) : miniprogramThis?.createSelectorQuery?.()
}

/**
 * 获取匹配指定选择器的第一个元素
 *
 * @export
 * @param {string} selector
 * @param {MPInst} dom
 * @return {*}  {(MPElement | null)}
 */
export function useSelector (selector: string, dom?: MPInst): MPElement | null {
  return canUseMP() ? useQuery(dom).select(selector) : null
}

/**
 * 获取匹配指定选择器的所有元素
 *
 * @export
 * @param {string} selector
 * @param {MPInst} dom
 * @return {*}  {(MPElement | null)}
 */
export function useSelectorAll (selector: string, dom?: MPInst): MPElement | null {
  return canUseMP() ? useQuery(dom).selectAll(selector) : null
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
  borderRightWidth: number;
  borderLeftWidth: number;
  borderTopWidth: number;
  borderBottomWidth: number;
  width: number;
  height: number;
  id: number;
  dataset: Record<string, string>;
  mark: Record<string, string>;
  top: number;
  right: number;
  bottom: number;
  left: number;
  scrollHeight: number;
  scrollLeft: number;
  scrollTop: number;
  scrollWidth: number;
  node: Record<string, any>;
}

const makeNodeRef = (node: NodeRef) => {
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

export const useRef = (selector: string | string[], dom?: MPInst) => {
  return new Promise((resolve) => {
      const query = useQuery(dom)
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

export const useRefAll = (selector: string | string[], dom?: MPInst) => {
  return new Promise((resolve) => {
      const query = useQuery(dom)
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

export const useRect = (selector: string | string[], dom?: MPInst) => {
  return new Promise((resolve) => {
      const query = useQuery(dom)
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

export const useRectAll = (selector: string | string[], dom?: MPInst) => {
  return new Promise((resolve) => {
      const query = useQuery(dom)
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

export const useScrollOffset = (dom?: MPInst) => {
  return new Promise((resolve) => {
      const query = useQuery(dom)
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

export const useComputedStyle = (selector: string, ...args: any[]) => {
  const computedStyle = args.length === 2 ? args[0] : ['width', 'height']
  const dom = args.length === 2 ? args[1] : args[0]
  return new Promise((resolve) => {
      const query = useQuery(dom)
      if (query) {
      query
          .select(selector)
          .fields({
              computedStyle,
          })
      query.exec(([node]) => {
          resolve(node)
      })
    }
  })
}
