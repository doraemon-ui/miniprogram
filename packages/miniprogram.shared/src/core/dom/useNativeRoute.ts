import { miniprogramThis } from './global'
import { buildURL } from '../util'

export type NativeRouteOpenType = 'navigateTo' | 'redirectTo' | 'switchTab' | 'navigateBack' | 'reLaunch'

export interface NativeRouteProps {
  /** 页面的路径 */
  url?: string
  /** 拼接到 url 路径后的参数 */
  urlParams?: Record<string, any>
  /** 跳转方式 */
  openType?: NativeRouteOpenType
  /** 返回的页面数，如果 delta 大于现有页面数，则返回到首页。open-type="navigateBack"时有效 */
  delta?: number
}

/**
 * openType 属性可选值为 navigateTo、redirectTo、switchTab、navigateBack、reLaunch
 */
export const NATIVE_ROUTES: NativeRouteOpenType[] = [
  'navigateTo',
  'redirectTo',
  'switchTab',
  'navigateBack',
  'reLaunch',
]

/**
 * 跳转到指定的页面
 *
 * @export
 * @param {NativeRouteProps} props 参数对象
 * @param {*} vm 小程序页面或组件的实例对象
 * @return {*} 
 */
export function useNativeRoute(props: NativeRouteProps, vm) {
  const { url, urlParams, openType = 'navigateTo', delta = 1 } = props
  const promisify = (method: string, params: NativeRouteProps) => {
    return new Promise((resolve, reject) => {
      try {
        miniprogramThis[method]?.call(miniprogramThis, {
          ...params,
          success: resolve,
          fail: reject,
        })
      } catch (e) {
        reject(e)
      }
    })
  }
  if (!url) {
    return Promise.reject(
      `Invalid value of prop "url" of "${vm.is}": Expected an Non-empty String.`
    )
  } else if (!NATIVE_ROUTES.includes(openType)) {
    return Promise.reject(
      `Invalid value of prop "openType" of "${vm.is}": expected "${NATIVE_ROUTES.join(',')}", ` +
      `but got ${openType}.`
    )
  } else if (openType === 'navigateBack') {
    return promisify(openType, { delta })
  } else {
    return promisify(openType, { url: buildURL(url, urlParams) })
  }
}
