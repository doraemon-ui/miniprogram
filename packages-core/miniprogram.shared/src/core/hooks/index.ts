export * from './useColorCls'
export * from './useCSSVarCls'
export * from './useExternalCls'
export * from './useHoverCls'
export * from './useMergeSemantic'

import { useColorCls } from './useColorCls'
import { useCSSVarCls } from './useCSSVarCls'
import { useExternalCls } from './useExternalCls'
import { useHoverCls } from './useHoverCls'
import {
  fillObjectBySchema,
  mergeClassNames,
  mergeStyles,
  resolveStyleOrClass,
  useMergeSemantic,
  useMergeSemanticClassNames,
  useMergeSemanticStyles,
  useMergeSemanticStylesString,
} from './useMergeSemantic'

export default {
  useColorCls,
  useCSSVarCls,
  useExternalCls,
  useHoverCls,
  fillObjectBySchema,
  mergeClassNames,
  mergeStyles,
  resolveStyleOrClass,
  useMergeSemantic,
  useMergeSemanticClassNames,
  useMergeSemanticStyles,
  useMergeSemanticStylesString,
}
