import type { MiniprogramComponentInstance, MiniprogramPublicInstance } from '../../types'
import { getCurrentPage } from './getCurrentPage'

/**
 * 获取自定义组件的实例
 *
 * @export
 * @template T
 * @param {string} selector
 * @param {MiniprogramPublicInstance} [instance=getCurrentPage()]
 * @return {*}  {(T | null)}
 */
export function findComponentNode<T = MiniprogramComponentInstance>(
  selector: string,
  instance: MiniprogramPublicInstance = getCurrentPage(),
): T | null {
  return (instance?.selectComponent(selector) as unknown as T) || null
}
