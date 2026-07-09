let warning = function (condition: unknown, format?: string, ...args: unknown[]) {}

const __DEV__ = true

if (__DEV__) {
  const printWarning = (format: string, ...args: unknown[]) => {
    let argIndex = 0
    const message = `Warning: ${format.replace(/%s/g, () => String(args[argIndex++]))}`
    if (typeof console !== 'undefined' && console.error) {
      console.error(message)
    }
    try {
      throw new Error(message)
    } catch (_e) {
      /** Ignore */
    }
  }

  warning = (condition: unknown, format?: string, ...args: unknown[]) => {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning message argument')
    }
    if (!condition) {
      printWarning(format, ...args)
    }
  }
}

export default warning
