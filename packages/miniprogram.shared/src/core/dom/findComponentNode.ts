import { MPComponentInst, MPInst } from '../../types'
import { getCurrentPage } from './getCurrentPage'

/**
 * 获取自定义组件的实例
 *
 * @export
 * @template T
 * @param {string} selector
 * @param {MPInst} [dom=getCurrentPage()]
 * @return {*}  {(T | null)}
 */
export function findComponentNode<T = MPComponentInst> (selector: string, dom: MPInst = getCurrentPage()): T | null {
  return (dom?.selectComponent(selector) as unknown) as T || null
}
