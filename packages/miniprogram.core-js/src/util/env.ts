const check =  (it: any) => {
  return it && typeof it.env && it
}

export const miniprogramThis = check(typeof wx === 'object' && wx)

/**
 * miniporgram environment sniffing
 */
export const inMiniprogram = !!miniprogramThis

/**
 * development mode
 */
export const isDev = process.env.NODE_ENV !== 'production'
// export const isDev = true
