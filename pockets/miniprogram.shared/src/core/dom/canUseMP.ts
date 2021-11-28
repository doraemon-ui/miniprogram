/**
 * 判断小程序环境
 *
 * @export
 * @param {string} [api='wx']
 * @return {*}  {boolean}
 */
export function canUseMP (api: string = 'wx'): boolean {
  return typeof self[api] !== 'undefined'
}
