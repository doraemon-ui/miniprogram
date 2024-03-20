import { miniprogramThis } from './global'

/**
 * 判断小程序环境
 *
 * @export
 * @return {*}  {boolean}
 */
export function canUseMP (): boolean {
  return miniprogramThis && typeof getCurrentPages !== 'undefined'
}
