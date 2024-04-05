import type { Doraemon } from '../instance'
import type { DefaultComputed, DefaultMethods, ExtractComputedReturns } from './options'

// If the type T accepts type "any", output type Y, otherwise output type N.
// https://stackoverflow.com/questions/49927523/disallow-call-with-any/49928360#49928360
export type IfAny<T, Y, N> = 0 extends 1 & T ? Y : N
export type Prettify<T> = { [K in keyof T]: T[K] } & {}
export interface ComponentCustomProperties {}
export type ComponentPublicInstance<
  D extends Doraemon = Doraemon,
  Props = {},
  RawBindings = {},
  Data = {},
  Computed extends DefaultComputed = {},
  Methods extends DefaultMethods<D> = {},
  PublicProps = Props
> = Pick<D, '$options' | '$emit' | '$nextTick'> & {
  $data: Data
  $props: Prettify<Props> & PublicProps
  $refs: { [key: string]: ComponentPublicInstance | ComponentPublicInstance[] | undefined }
  $root: ComponentPublicInstance | undefined
  $parent: ComponentPublicInstance | undefined
  $children: ComponentPublicInstance[] | undefined
} & IfAny<Props, Props, Omit<Props, keyof RawBindings>> &
  RawBindings &
  ExtractComputedReturns<Computed> &
  Methods &
  ComponentCustomProperties
