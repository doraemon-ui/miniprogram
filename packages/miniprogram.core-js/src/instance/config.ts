import { LIFECYCLE_HOOKS } from '../util/constants'

export type Config = {
  /**
   * 取消所有的日志与警告
   *
   * @type {boolean}
   */
  silent: boolean

  /**
   * 当前的主题
   *
   * auto: 跟随系统, dark: 深色模式, light 浅色模式
   *
   * @type {('auto' | 'dark' | 'light')}
   */
  darkmode: 'auto' | 'dark' | 'light'

  /**
   * 是否记录性能
   */
  performance: boolean

  /**
   * 警告函数
   *
   */
  warnHandler: (msg: string) => void

  /**
   * 生命周期钩子函数
   *
   * @type {string[]}
   */
  _lifecycleHooks: string[]
}

export const config = {
  /**
   * 取消所有的日志与警告
   */
  silent: false,

  /**
   * 当前的主题
   */
  darkmode: 'auto',

  /**
   * 是否记录性能
   */
  performance: false,

  /**
   * 警告函数
   */
  warnHandler: null,

  /**
   * 生命周期钩子函数
   */
  _lifecycleHooks: LIFECYCLE_HOOKS,
} as Config
