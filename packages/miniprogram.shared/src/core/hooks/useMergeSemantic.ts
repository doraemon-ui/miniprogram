import { Doraemon } from '@doraemon-ui/miniprogram.core-js'
import type { CSSStylePropertiesWithVars } from '@doraemon-ui/miniprogram.core-js'

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

export type DeepStylesType<T> = {
  [K in keyof T]?: CSS extends T[K] ? CSS : DeepStylesType<T[K]>
}

export type DeepStylesStringType<T> = {
  [K in keyof T]?: CSS extends T[K] ? string : DeepStylesStringType<T[K]>
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

function isFunction(value: unknown): value is (...args: any[]) => any {
  return typeof value === 'function'
}

function isPlainObject(value: unknown): value is AnyObject {
  return Object.prototype.toString.call(value) === '[object Object]'
}

/**
 * Fill object structure by schema, initialize empty objects for keys with `_default` property.
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
export const mergeClassNames = <Name extends string, SemanticClassNames extends Partial<Record<Name, any>>>(
  schema: SemanticSchema = {},
  ...classNameList: (SemanticClassNames | undefined)[]
) => {
  return classNameList
    .filter((item): item is SemanticClassNames => Boolean(item))
    .reduce<SemanticClassNames>((acc: any, cur) => {
      // Loop keys of the current classNames
      Object.keys(cur).forEach((key) => {
        const keySchema = schema[key as keyof SemanticSchema] as SemanticSchema
        const curVal = cur[key as keyof SemanticClassNames]

        if (keySchema) {
          if (isPlainObject(curVal)) {
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
export const mergeStyles = <StylesType extends AnyObject>(...styles: (Partial<StylesType> | undefined)[]) => {
  return styles
    .filter((item): item is Partial<StylesType> => Boolean(item))
    .reduce<Record<PropertyKey, CSS>>((acc, cur = {}) => {
      Object.keys(cur).forEach((key) => {
        acc[key] = { ...acc[key], ...cur[key] }
      })
      return acc
    }, {})
}

export const useSemanticClassNames = <ClassNamesType extends AnyObject>(
  schema?: SemanticSchema,
  ...classNames: (Partial<ClassNamesType> | undefined)[]
): Partial<ClassNamesType> => {
  return mergeClassNames(schema, ...classNames)
}

export const useSemanticStyles = <StylesType extends AnyObject>(...styles: (Partial<StylesType> | undefined)[]): StylesType => {
  return mergeStyles(...styles) as StylesType
}

function stringifySemanticStyles<T extends AnyObject>(styles: T): DeepStylesStringType<T> {
  return Object.keys(styles).reduce((acc, key) => {
    const value = styles[key]

    if (isPlainObject(value) && Object.values(value).some((item) => isPlainObject(item))) {
      acc[key as keyof T] = stringifySemanticStyles(value) as DeepStylesStringType<T>[keyof T]
    } else {
      acc[key as keyof T] = stringifyStyle((value as CSS) || {}) as DeepStylesStringType<T>[keyof T]
    }

    return acc
  }, {} as DeepStylesStringType<T>)
}

export const useSemanticStylesString = <StylesType extends AnyObject>(
  ...styles: (Partial<StylesType> | undefined)[]
): DeepStylesStringType<StylesType> => {
  return stringifySemanticStyles(useSemanticStyles(...styles))
}

// =========================== Export ===========================
export const resolveStyleOrClass = <T = any, Props = any>(value: T | ((config: { props: Props }) => T), info: { props: Props }) => {
  return isFunction(value) ? value(info) : value
}

/**
 * @desc Merge classNames and styles from multiple sources. When `schema` is provided, it **must** provide the nest object structure.
 * @descZH 合并来自多个来源的 classNames 和 styles，当提供了 `schema` 时，必须提供嵌套的对象结构。
 */
export const useMergeSemantic = <ClassNamesType = any, StylesType = any, Props = any>(
  classNamesList: MaybeFn<ClassNamesType, Props>[],
  stylesList: MaybeFn<StylesType, Props>[],
  info: { props: Props },
  schema?: SemanticSchema,
) => {
  const resolvedClassNamesList = classNamesList.map((classNames) => (classNames ? resolveStyleOrClass(classNames, info) : undefined))
  const resolvedStylesList = stylesList.map((styles) => (styles ? resolveStyleOrClass(styles, info) : undefined))

  const mergedClassNames = useSemanticClassNames(schema, ...(resolvedClassNamesList as Array<Partial<Record<string, any>> | undefined>))
  const mergedStyles = useSemanticStyles(...(resolvedStylesList as Array<AnyObject | undefined>))

  if (!schema) {
    return [mergedClassNames, mergedStyles] as [
      Required<RemoveClassNamesString<NonNullable<ClassNamesType>>>,
      Required<NonNullable<StylesType>>,
    ]
  }

  return [fillObjectBySchema(mergedClassNames, schema), fillObjectBySchema(mergedStyles, schema)] as [
    Required<RemoveClassNamesString<NonNullable<ClassNamesType>>>,
    Required<NonNullable<StylesType>>,
  ]
}
