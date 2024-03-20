import { MPElement, MPInst } from '../../types'
import { canUseMP } from './canUseMP'
import { getCurrentDOM } from './getCurrentDOM'

/**
 * 获取匹配指定选择器的第一个元素
 *
 * @export
 * @param {string} selector
 * @param {MPInst} [dom=getCurrentDOM()]
 * @return {*}  {(MPElement | null)}
 */
export function querySelector (selector: string, dom: MPInst = getCurrentDOM()): MPElement | null {
  return canUseMP() ? wx?.createSelectorQuery().in(dom).select(selector) : null
}
