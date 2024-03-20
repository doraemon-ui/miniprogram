import { MPInst } from '../../types'
import { canUseMP } from './canUseMP'

/**
 * 获取当前页面的实例
 *
 * @export
 * @return {*}  {(MPInst | null)}
 */
export function getCurrentDOM (): MPInst | null {
  return canUseMP() ? getCurrentPages()[getCurrentPages().length - 1] : null
}
