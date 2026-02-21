import { canUseMP } from './canUseMP'
import type { MiniprogramPublicInstance } from '../../types'

/**
 * 获取当前页面的实例
 *
 * @export
 * @return {*}  {(MiniprogramPublicInstance | null)}
 */
export function getCurrentPage(): MiniprogramPublicInstance | null {
  return canUseMP() ? getCurrentPages()[getCurrentPages().length - 1] : null
}
