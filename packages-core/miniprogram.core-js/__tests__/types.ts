import type { ComponentPublicInstance, CustomEvent } from '../src'

import type { MyComp } from './my-comp'
import type { TestComp } from './test-comp'

/**
 * MyComp props
 */
export interface MyCompProps {
  foo?: number
  bar?: string
  wrapStyle?: Partial<CSSStyleDeclaration>
}

/**
 * MyComp exposed properties and methods
 */
export interface MyCompExpose {
  a: string
  b: number
  field1: string
  field2: string
  msg: string
  changed: boolean
  count: number
  hello(): void
  resetCount(): void
  increment(e: Partial<CustomEvent>): void
  decrement(n1: number, n2: number): void
  promise(): Promise<number>
}

export type MyCompInstance = ComponentPublicInstance<MyComp, MyCompProps, MyCompExpose>

/**
 * TestComp is an empty component — no extra props or expose
 */
export type TestCompInstance = ComponentPublicInstance<TestComp, {}, {}>
