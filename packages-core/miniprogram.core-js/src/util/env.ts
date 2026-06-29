/**
 * Runtime environment types.
 * - WEAPP: WeChat Miniporgram
 * - TT: Douyin/Toutiao Miniporgram
 */
export enum ENV_TYPE {
  WEAPP = 'WEAPP',
  TT = 'TT',
}

const check = (it: any) => {
  return it && typeof it.env && it
}

const wxThis = check(typeof wx === 'object' && wx)
const ttThis = check(typeof tt === 'object' && tt)

/**
 * Current Miniporgram global object.
 */
export const miniprogramThis = wxThis || ttThis

/**
 * Miniporgram environment sniffing.
 */
export const inMiniprogram = !!miniprogramThis

/**
 * Get the current runtime environment type.
 *
 * @returns Current environment type.
 */
export const getEnv = (): ENV_TYPE => {
  if (ttThis) {
    return ENV_TYPE.TT
  }
  return ENV_TYPE.WEAPP
}

/**
 * Whether the current build is running in development mode.
 */
export const isDev = process.env.NODE_ENV !== 'production'
// export const isDev = true
