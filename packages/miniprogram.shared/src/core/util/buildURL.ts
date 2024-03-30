import { isDate } from './isDate'
import { isObject } from './isObject'

function encode(val : string) : string {
  // 对url进行编码并处理特殊字符
  return encodeURIComponent(val)
    //ig为全局查找，忽略大小写
    .replace(/%40/g, '@')
    .replace(/%3A/ig, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/ig, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/ig, '[')
    .replace(/%5D/ig , ']')
}   

export function buildURL(url: string, params?: Record<string, any>): string{
  // 没有 params 就直接返回 url，无需拼接
  if (!params) {
    return url
  }

  const parts : string[] = []

  Object.keys(params).forEach((key) => {
    // key 对应的是索引值，数组索引值默认从 0 开始，对象的索引值为 key
    const val = params[key]
    // 如果传入的 params 参数有 null 或者 undefined，那么就处理下一个参数
    if (val === null || typeof val === 'undefined'){
      // 此处的 return 不是退出循环，而是处理下一个参数
      return
    }
    let values = []
    // 如果这个参数是数组
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      // 如果不是数组，那就把它统一变为数组
      values = [val]
    }

    values.forEach((val) => {
      if (isDate(val)) {
        // toISOString() 方法返回一个 ISO（ISO 格式的字符串： YYYY-MM-DDTHH:mm:ss.sssZ。
        val = val.toISOString()
      } else if (isObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })

  // 将参数以 & 进行连接
  let serializedParams = parts.join('&')

  // 如果 params 参数都为空，parts 是一个空数组
  if (serializedParams) {
    // 查找 url 中是否有 hash 的表示，即 #，因为需要忽略
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      // 存在就需要删除
      url = url.slice(0, markIndex)
    }
    // 在 params 参数之前需要一个 ?
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }

  return url
}
