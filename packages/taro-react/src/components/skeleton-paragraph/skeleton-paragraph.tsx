import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { SkeletonParagraphProps, SkeletonParagraphExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
export const SkeletonParagraph = createHostComponent<SkeletonParagraphProps, SkeletonParagraphExpose>('dora-skeleton-paragraph',
{
  prefixCls: 'dora-skeleton-paragraph',
  rows: 3,
  rounded: false,
  active: false,
})

SkeletonParagraph.displayName = 'DoraSkeletonParagraph'

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-skeleton-paragraph', {
  prefixCls: '',
  rows: '',
  rounded: '',
  active: '',
})
