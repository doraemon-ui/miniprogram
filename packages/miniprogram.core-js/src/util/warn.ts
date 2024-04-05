import type { Doraemon } from '../instance'
import { config } from '../instance/config'

const hasConsole = typeof console !== 'undefined'

export function warn (msg: string, vm?: Doraemon): void {
  if (config.warnHandler) {
    config.warnHandler.call(null, msg)
  } else if (hasConsole && (!config.silent)) {
    console.error(`[Doraemon warn]: ${msg}`)
  }
}
