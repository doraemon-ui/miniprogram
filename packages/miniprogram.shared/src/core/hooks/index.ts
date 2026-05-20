export * from './useColorCls'
export * from './useCSSVarCls'
export * from './useMergeSemantic'

import { useColorCls } from './useColorCls'
import { useCSSVarCls } from './useCSSVarCls'

import {
  fillObjectBySchema,
  mergeClassNames,
  mergeStyles,
  useSemanticClassNames,
  useSemanticStyles,
  useSemanticStylesString,
  resolveStyleOrClass,
  useMergeSemantic,
} from './useMergeSemantic'

export default {
  useColorCls,
  useCSSVarCls,
  fillObjectBySchema,
  mergeClassNames,
  mergeStyles,
  useSemanticClassNames,
  useSemanticStyles,
  useSemanticStylesString,
  resolveStyleOrClass,
  useMergeSemantic,
}
