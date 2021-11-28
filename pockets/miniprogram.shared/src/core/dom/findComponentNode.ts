import { MPComponentInst, MPInst } from '../../types'
import { getCurrentDOM } from './getCurrentDOM'

/**
 * 获取自定义组件的实例
 *
 * @export
 * @template T
 * @param {string} selector
 * @param {MPInst} [dom=getCurrentDOM()]
 * @return {*}  {(T | null)}
 */
export function findComponentNode<T = MPComponentInst> (selector: string, dom: MPInst = getCurrentDOM()): T | null {
  return (dom?.selectComponent(selector) as unknown) as T || null
}
