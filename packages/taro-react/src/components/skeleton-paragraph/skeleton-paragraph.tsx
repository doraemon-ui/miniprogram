import { createHostComponent } from '../../hooks/hostComponent'
import type { SkeletonParagraphProps, SkeletonParagraphExpose } from './types'

export const SkeletonParagraph = createHostComponent<SkeletonParagraphProps, SkeletonParagraphExpose>('dora-skeleton-paragraph',
{
  prefixCls: 'dora-skeleton-paragraph',
  rows: 3,
  rounded: false,
  active: false,
})

SkeletonParagraph.displayName = 'DoraSkeletonParagraph'
