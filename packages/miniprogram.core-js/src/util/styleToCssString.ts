/** @ts-ignore */
import CSSProperty from 'react-style-object-to-css/lib/CSSProperty'
import hyphenateStyleName from 'react-style-object-to-css/lib/hyphenateStyleName'

const isUnitlessNumber = CSSProperty.isUnitlessNumber
const isArray = Array.isArray
const keys = Object.keys

const counter = 1
// Follows syntax at https://developer.mozilla.org/en-US/docs/Web/CSS/content,
// including multiple space separated values.
const unquotedContentValueRegex = /^(normal|none|(\b(url\([^)]*\)|chapter_counter|attr\([^)]*\)|(no-)?(open|close)-quote|inherit)((\b\s*)|$|\s+))+)$/

function buildRule(
  key: string,
  value: any,
  exclude?: RegExp
) {
  if ((key.toString().match(exclude) === null) && !isUnitlessNumber[key] && typeof value === 'number') {
    value = '' + value + 'px'
  }
  else if (key === 'content' && !unquotedContentValueRegex.test(value)) {
    value = "'" + value.replace(/'/g, "\\'") + "'"
  }

  return hyphenateStyleName(key) + ': ' + value + ';  '
}

// css var prefix
const cssVarPattern = /^--/

export function styleToCssString (
  rules: string | Record<string, any>,
  options: {
    exclude?: RegExp
  } = {
    exclude: cssVarPattern
  }
): string {
  const exclude = options ? options.exclude : null
  if (typeof rules === 'string') {
    rules = rules.trim()
    return rules.slice(-1) === ';' ? `${rules} ` : `${rules}; `
  }
  let result = ''
  if (!rules || keys(rules).length === 0) {
    return result
  }
  const styleKeys = keys(rules)
  for (let j = 0, l = styleKeys.length; j < l; j++) {
    const styleKey = styleKeys[j]
    const value = rules[styleKey]

    if (isArray(value)) {
      for (let i = 0, len = value.length; i < len; i++) {
        result += buildRule(styleKey, value[i], exclude)
      }
    }
    else {
      result += buildRule(styleKey, value, exclude)
    }
  }
  return result
}
/** @ts-ignore */
