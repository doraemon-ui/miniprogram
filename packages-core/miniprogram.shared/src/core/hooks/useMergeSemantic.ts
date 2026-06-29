import { Doraemon } from '@doraemon-ui/miniprogram.core-js'
import type { CSSStylePropertiesWithVars } from '@doraemon-ui/miniprogram.core-js'
import { isFunction, isObject } from '../util'

export type AnyObject = Record<string, any>

export type ValidChar =
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'h'
  | 'i'
  | 'j'
  | 'k'
  | 'l'
  | 'm'
  | 'n'
  | 'o'
  | 'p'
  | 'q'
  | 'r'
  | 's'
  | 't'
  | 'u'
  | 'v'
  | 'w'
  | 'x'
  | 'y'
  | 'z'

export type SemanticSchema = { _default?: string } & {
  [key: `${ValidChar}${string}`]: SemanticSchema
}

type RemoveString<T> = T extends string ? never : T

export type RemoveClassNamesString<T> = {
  [K in keyof T]: string | Record<string, any> extends T[K] ? RemoveString<T[K]> : T[K]
}

export type DeepClassNameType<T> = {
  [K in keyof T]?: string extends T[K] ? string | DeepClassNameType<T[K]> : DeepClassNameType<T[K]>
}

type CSS = CSSStylePropertiesWithVars
type IsAny<T> = 0 extends 1 & T ? true : false
export type SemanticStyleValue = CSS | string
export type SemanticStyleNode = SemanticStyleValue | SemanticStyles
export type SemanticStyles = {
  [key: string]: SemanticStyleNode | undefined
}

export type DeepStylesType<T> =
  IsAny<T> extends true
    ? SemanticStyles
    : string extends NonNullable<T>
      ? SemanticStyleValue
      : CSS extends NonNullable<T>
        ? SemanticStyleValue
        : {
            [K in keyof NonNullable<T>]?: DeepStylesType<NonNullable<T>[K]>
          }

export type DeepStylesStringType<T> =
  IsAny<T> extends true
    ? Record<string, any>
    : string extends NonNullable<T>
      ? string
      : CSS extends NonNullable<T>
        ? string
        : {
            [K in keyof NonNullable<T>]?: DeepStylesStringType<NonNullable<T>[K]>
          }

export type GenerateSemantic<T extends { classNames?: any; styles?: any }, Props> = {
  // classNames
  classNames: DeepClassNameType<T['classNames']>
  classNamesNoString: RemoveClassNamesString<DeepClassNameType<T['classNames']>>
  classNamesFn: (info: { props: Props }) => DeepClassNameType<T['classNames']>
  classNamesAndFn: DeepClassNameType<T['classNames']> | ((info: { props: Props }) => DeepClassNameType<T['classNames']>)
  // styles
  styles: DeepStylesType<T['styles']>
  stylesFn: (info: { props: Props }) => DeepStylesType<T['styles']>
  stylesAndFn: DeepStylesType<T['styles']> | ((info: { props: Props }) => DeepStylesType<T['styles']>)
}

type MaybeFn<T, P> = T | ((info: { props: P }) => T) | undefined

const { classNames, styleToCssString: stringifyStyle } = Doraemon.util

/**
 * Fill semantic object structure by schema.
 *
 * Priority:
 * 1. Preserve existing values from `value`
 * 2. Initialize missing schema branches so downstream merges always receive a complete shape
 *
 * Example:
 * ```ts
 * fillObjectBySchema({}, {
 *   header: { _default: 'root' },
 *   body: { _default: 'root' },
 * })
 * // => { header: {}, body: {} }
 * ```
 *
 * @param value Current semantic object
 * @param schema Semantic schema definition
 * @returns Object expanded to match the schema structure
 */
export function fillObjectBySchema<T extends AnyObject = AnyObject>(value: T | undefined, schema: SemanticSchema = {}): T {
  const newObj: Record<string, any> = { ...(value || {}) }

  Object.keys(schema).forEach((key) => {
    const currentSchema = schema[key as keyof typeof schema] as Record<string, any>

    if (currentSchema?._default) {
      newObj[key] ||= {}
    } else {
      newObj[key] = fillObjectBySchema(newObj[key], currentSchema)
    }
  })

  return newObj as T
}

// ========================= ClassNames =========================
/**
 * Merge semantic class name objects.
 *
 * Priority:
 * 1. Merge nested schema keys recursively
 * 2. Convert schema-backed string values into the schema `_default` slot
 * 3. Flatten non-schema keys with shared class name concatenation
 *
 * Example:
 * ```ts
 * mergeClassNames(
 *   { header: { _default: 'root', icon: {} } },
 *   { header: 'base' },
 *   { header: 'extra' },
 * )
 * // => { header: { root: 'base extra' } }
 * ```
 *
 * @param schema Semantic schema definition
 * @param classNameList Semantic class name sources
 * @returns Merged semantic class name object
 */
export function mergeClassNames<Name extends string, SemanticClassNames extends Partial<Record<Name, any>>>(
  schema: SemanticSchema = {},
  ...classNameList: (SemanticClassNames | undefined)[]
): SemanticClassNames {
  return classNameList
    .filter((item): item is SemanticClassNames => Boolean(item))
    .reduce<SemanticClassNames>((acc: any, cur) => {
      // Loop keys of the current classNames
      Object.keys(cur).forEach((key) => {
        const keySchema = schema[key as keyof SemanticSchema] as SemanticSchema
        const curVal = cur[key as keyof SemanticClassNames]

        if (keySchema) {
          if (isObject(curVal)) {
            // Loop fill
            acc[key] = mergeClassNames(keySchema, acc[key], curVal)
          } else {
            // Covert string to object structure
            const { _default: defaultField } = keySchema
            if (defaultField) {
              acc[key] = acc[key] || {}
              acc[key][defaultField] = classNames(acc[key][defaultField], curVal)
            }
          }
        } else {
          // Flatten fill
          acc[key] = classNames(acc[key], curVal)
        }
      })

      return acc
    }, {} as SemanticClassNames)
}

// =========================== Styles ===========================
function mergeStyleValue(prev: unknown, cur: unknown): SemanticStyleNode {
  if (typeof prev === 'string' || typeof cur === 'string') {
    return `${prev ? stringifyStyle(prev as SemanticStyleValue) : ''}${cur ? stringifyStyle(cur as SemanticStyleValue) : ''}`
  }

  return { ...(prev as AnyObject), ...((cur || {}) as AnyObject) }
}

/**
 * Merge semantic style objects.
 *
 * Priority:
 * 1. Ignore empty style sources
 * 2. Merge object styles by key with later values taking precedence
 * 3. Concatenate style strings when either side is already serialized
 *
 * Example:
 * ```ts
 * mergeStyles({ root: { color: 'red' } }, { root: { fontSize: 12 } })
 * // => { root: { color: 'red', fontSize: 12 } }
 * ```
 *
 * @param styles Semantic style sources
 * @returns Merged semantic style object
 */
export function mergeStyles<StylesType extends AnyObject>(
  ...styles: (DeepStylesType<StylesType> | SemanticStyles | undefined)[]
): SemanticStyles {
  return styles
    .filter((item): item is DeepStylesType<StylesType> | SemanticStyles => Boolean(item))
    .reduce<SemanticStyles>((acc, cur = {}) => {
      const currentStyles = cur as AnyObject
      Object.keys(currentStyles).forEach((key) => {
        acc[key] = mergeStyleValue(acc[key], currentStyles[key])
      })
      return acc
    }, {})
}

function stringifySemanticStyles<T extends AnyObject>(styles: T): DeepStylesStringType<T> {
  const result: AnyObject = {}

  Object.keys(styles).forEach((key) => {
    const value = styles[key]

    if (isObject(value) && Object.values(value).some((item) => isObject(item))) {
      result[key] = stringifySemanticStyles(value)
    } else {
      result[key] = stringifyStyle((value as SemanticStyleValue) || {})
    }
  })

  return result as DeepStylesStringType<T>
}

// =========================== Export ===========================
/**
 * Resolve a semantic class/style value that may be static or derived from props.
 *
 * @param value Static value or value factory
 * @param info Runtime props info passed to the factory
 * @returns Resolved semantic class/style value
 */
export function resolveStyleOrClass<T = any, Props = any>(
  value: T | ((config: { props: Props }) => T),
  info: { props: Props },
): T {
  return isFunction(value) ? value(info) : value
}

/**
 * Resolve and merge semantic class name sources.
 *
 * @param classNamesList Semantic class name sources or factories
 * @param info Runtime props info passed to factories
 * @param schema Semantic schema definition for nested structures
 * @returns Merged semantic class names
 */
export function useMergeSemanticClassNames<ClassNamesType = any, Props = any>(
  classNamesList: MaybeFn<ClassNamesType, Props>[],
  info: { props: Props },
  schema?: SemanticSchema,
): Partial<Record<string, any>> {
  const resolvedClassNamesList = classNamesList.map((classNames) => (classNames ? resolveStyleOrClass(classNames, info) : undefined))

  return mergeClassNames(schema, ...(resolvedClassNamesList as Array<Partial<Record<string, any>> | undefined>))
}

/**
 * Resolve and merge semantic style sources.
 *
 * @param stylesList Semantic style sources or factories
 * @param info Runtime props info passed to factories
 * @returns Merged semantic styles
 */
export function useMergeSemanticStyles<StylesType = any, Props = any>(
  stylesList: MaybeFn<DeepStylesType<StylesType> | SemanticStyles, Props>[],
  info: { props: Props },
): DeepStylesType<StylesType> {
  const resolvedStylesList = stylesList.map((styles) => (styles ? resolveStyleOrClass(styles, info) : undefined))

  return mergeStyles(...(resolvedStylesList as Array<DeepStylesType<StylesType> | SemanticStyles | undefined>)) as DeepStylesType<StylesType>
}

/**
 * Resolve, merge, and stringify semantic style sources.
 *
 * @param stylesList Semantic style sources or factories
 * @param info Runtime props info passed to factories
 * @returns Merged semantic styles as serialized css strings
 */
export function useMergeSemanticStylesString<StylesType = any, Props = any>(
  stylesList: MaybeFn<DeepStylesType<StylesType> | SemanticStyles, Props>[],
  info: { props: Props },
): DeepStylesStringType<StylesType> {
  return stringifySemanticStyles(useMergeSemanticStyles(stylesList, info) as AnyObject) as DeepStylesStringType<StylesType>
}

/**
 * Merge semantic class names and styles from multiple sources.
 *
 * Priority:
 * 1. Resolve function inputs with runtime props
 * 2. Merge class names and styles independently
 * 3. Fill the merged result with `schema` when nested semantic structure is required
 *
 * Example:
 * ```ts
 * useMergeSemantic(
 *   [{ root: 'base' }],
 *   [{ root: { color: 'red' } }],
 *   { props: {} },
 * )
 * // => [{ root: 'base' }, { root: { color: 'red' } }]
 * ```
 *
 * @param classNamesList Semantic class name sources or factories
 * @param stylesList Semantic style sources or factories
 * @param info Runtime props info passed to factories
 * @param schema Semantic schema definition for nested structures
 * @returns Tuple of merged class names and merged styles
 */
export function useMergeSemantic<ClassNamesType = any, StylesType = any, Props = any>(
  classNamesList: MaybeFn<ClassNamesType, Props>[],
  stylesList: MaybeFn<DeepStylesType<StylesType> | SemanticStyles, Props>[],
  info: { props: Props },
  schema?: SemanticSchema,
): [
  Required<RemoveClassNamesString<NonNullable<ClassNamesType>>>,
  Required<DeepStylesType<NonNullable<StylesType>>>,
] {
  const mergedClassNames = useMergeSemanticClassNames(classNamesList, info, schema)
  const mergedStyles = useMergeSemanticStyles(stylesList, info)

  if (!schema) {
    return [mergedClassNames, mergedStyles] as unknown as [
      Required<RemoveClassNamesString<NonNullable<ClassNamesType>>>,
      Required<DeepStylesType<NonNullable<StylesType>>>,
    ]
  }

  return [fillObjectBySchema(mergedClassNames, schema), fillObjectBySchema(mergedStyles as AnyObject, schema)] as unknown as [
    Required<RemoveClassNamesString<NonNullable<ClassNamesType>>>,
    Required<DeepStylesType<NonNullable<StylesType>>>,
  ]
}
