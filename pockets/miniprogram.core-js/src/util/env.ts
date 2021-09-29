/**
 * miniporgram environment sniffing
 */
export const inMiniprogram = typeof wx !== 'undefined'

/**
 * development mode
 */
export const isDev = process.env.NODE_ENV !== 'production'
// export const isDev = true
