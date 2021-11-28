import { MPDOMRect, MPElement } from '../../types'

/**
 * 获取指定元素的大小及其相对于视口的位置
 *
 * @export
 * @param {MPElement} element
 * @return {*}  {(Promise<MPDOMRect | MPDOMRect[]>)}
 */
export function getBoundingClientRect (element: MPElement): Promise<MPDOMRect | MPDOMRect[]> {
  return new Promise((resolve) => {
    element?.fields({
      rect: true,
      size: true,
      properties: ['scrollX', 'scrollY'],
    }).exec((rects) => {
      resolve(
        Array.isArray(rects)
          ? rects.map((rect) => ({
            ...rect,
            x: rect.left,
            y: rect.top,
          } as MPDOMRect))
          : {
            ...rects,
            x: rects.left,
            y: rects.top,
          } as MPDOMRect
      )
    })
  })
}
