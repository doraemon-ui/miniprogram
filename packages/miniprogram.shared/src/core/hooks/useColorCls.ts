import { isPresetColor } from '../util'

export const useColorCls = (color?: string): Record<string, boolean> | null => {
  if (!isPresetColor(color)) {
    return null
  }
  return {
    ['dora-color']: !!color,
    [`dora-color--${color}`]: !!color,
  }
}
