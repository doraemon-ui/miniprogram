/**
 * 判断小程序环境
 *
 * @export
 * @return {*}  {boolean}
 */
export function canUseMP (): boolean {
  return typeof wx !== 'undefined' && typeof getCurrentPages !== 'undefined'
}
